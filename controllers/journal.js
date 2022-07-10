const db = require("../db/models");
const User = require("../services/user");
const { create_transaction } = require("../services/transaction");

module.exports = {
  mint: async (req, res) => {
    const { amount, receiver_id, comment, fee } = req.body;
    const transaction = await db.sequelize.transaction();

    try {
      // Check if user exists
      let receiver = await User.findByIdIncludeAccounts(
        receiver_id,
        transaction
      );

      if (!receiver) {
        // User not found
        await transaction.rollback();
        return res
          .status(404)
          .send({ success: false, message: "Receiver not found" });
      }

      if (receiver.pay_accounts.length === 0) {
        // User has no account
        await transaction.rollback();
        return res
          .status(404)
          .send({ success: false, message: "Receiver has no account" });
      }

      let pay_account = receiver.pay_accounts[0]; // Get the first account

      let feePercent = 0; // Get fee percent from config
      if (fee) {
        // If fee is specified
        let pay = await db.pays.findAll({
          order: [["createdAt", "DESC"]],
          limit: 1,
        });

        feePercent = pay[0]?.actual_exchange_fee || 0;
      }

      let totalFee = Number(amount) * (Number(feePercent) / 100); // Calculate fee
      let totalAmount = Number(amount) - (Number(totalFee) || 0); // Calculate total amount

      // Update balance
      await pay_account.update(
        { balance: Number(pay_account.balance) + totalAmount },
        { transaction }
      );

      // Create Transaction Entrante origen 0
      let transactionData = {
        amount: totalAmount,
        crypto_hash: "",
        type: 2,
        exchange_fee: feePercent,
        status: "Finish",
        account_id: pay_account.id,
        user_id: receiver_id,
        currency_id: pay_account.currency_id,
        comments: comment,
      };
      await create_transaction(transactionData, transaction);
      await await transaction.commit();
      return res.status(200).send({ success: true, message: "Mint success" });
    } catch (error) {
      await transaction.rollback();
      return res.status(500).send({ success: false, message: error.message });
    }
  },
  pay: async (req, res) => {
    const { amount, fee, user_id, receiver_id, comment, currency } = req.body;
    const transaction = await db.sequelize.transaction();
    try {
      // Check if user exists
      let user = await User.findByIdAndCurrency(user_id, currency, transaction);

      if (!user) {
        // User not found
        await transaction.rollback();
        return res
          .status(404)
          .send({ success: false, message: "User not found" });
      }

      if (user.pay_accounts.length === 0) {
        // User has no account
        await transaction.rollback();
        return res
          .status(404)
          .send({ success: false, message: "User has no account" });
      }

      let pay_account = user.pay_accounts[0]; // Get the first account

      // Verificar que el cliente tenga suficiente saldo en la cuenta
      if (Number(pay_account.balance) < Number(amount)) {
        await transaction.rollback();
        return res
          .status(400)
          .send({ success: false, message: "Insufficient balance" });
      }

      let receiver_user = await User.findByIdAndCurrency(
        receiver_id,
        currency,
        transaction
      );

      if (!receiver_user) {
        // User not found
        await transaction.rollback();
        return res
          .status(404)
          .send({ success: false, message: "Receiver not found" });
      }

      if (receiver_user.pay_accounts.length === 0) {
        // User has no account
        await transaction.rollback();
        return res
          .status(404)
          .send({ success: false, message: "Receiver has no account" });
      }

      let receiver_account = receiver_user.pay_accounts[0]; // Get the first account

      let feePercent = 0; // Get fee percent from config
      if (fee) {
        // If fee is specified
        let pay = await db.pays.findAll({
          order: [["createdAt", "DESC"]],
          limit: 1,
        });

        feePercent = pay[0]?.actual_exchange_fee || 0;
      }

      let totalFee = Number(amount) * (Number(feePercent) / 100); // Calculate fee
      let totalAmount = Number(amount) - (Number(totalFee) || 0); // Calculate total amount

      // Update balance origin
      await pay_account.update(
        { balance: Number(pay_account.balance) - totalAmount },
        { transaction }
      );

      // Update balance destination
      await receiver_account.update(
        { balance: Number(receiver_account.balance) + totalAmount },
        { transaction }
      );

      // Create Transaction Saliente desde Origen
      let transactionData = {
        amount: totalAmount,
        crypto_hash: "",
        type: 1,
        exchange_fee: feePercent,
        status: "Finish",
        account_id: pay_account.id,
        user_id: user_id,
        currency_id: pay_account.currency_id,
        destinatary_id: receiver_account.id,
        comments: comment,
      };

      await create_transaction(transactionData, transaction);

      // Create Transaction Saliente desde Destino
      transactionData = {
        amount: totalAmount,
        crypto_hash: "",
        type: 1,
        exchange_fee: feePercent,
        status: "Finish",
        account_id: receiver_account.id,
        user_id: receiver_id,
        currency_id: receiver_account.currency_id,
        comments: comment,
      };

      await create_transaction(transactionData, transaction);
      await await transaction.commit();
      return res.status(200).send({ success: true, message: "Pay success" });
    } catch (error) {
      await transaction.rollback();
      return res.status(500).send({ success: false, message: error.message });
    }
  },
};
