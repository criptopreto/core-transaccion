"use strict";
const { mint, pay, history } = require("../../controllers/journal");
const db = require("../../db/models");
const User = require("../../services/user");
const { create_transaction } = require("../../services/transaction");

const { JournalSchema } = require("../../validates/journal");

module.exports = async function (fastify, opts) {
  fastify.addHook("preHandler", fastify.auth([fastify.verifyJWT]));
  fastify.post("/mint", mint);
  //fastify.post("/pay", JournalSchema.paySchema, pay);
  fastify.post("/pay", async (req, res) => {
    const { amount, fee, user_id, receiver_id, comment, currency } = req.body;
    // check if user id is an uuid v4
    if (
      !/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/.test(
        user_id
      )
    ) {
      return res
        .status(400)
        .send({ success: false, message: "User id is not valid" });
    }
    // check if receiver id is an uuid v4
    if (
      !/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/.test(
        receiver_id
      )
    ) {
      return res
        .status(400)
        .send({ success: false, message: "Receiver id is not valid" });
    }
    // check if currency is a valid currency
    if (
      !/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/.test(
        currency
      )
    ) {
      return res
        .status(400)
        .send({ success: false, message: "Currency is not valid" });
    }
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

      if (Number(amount) === 0) {
        await transaction.rollback();
        return res
          .status(400)
          .send({ success: false, message: "Amount Invalid" });
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

      let result = await create_transaction(transactionData, transaction);
      result = result.toJSON();
      result.balance = pay_account.balance;

      // Create Transaction Saliente desde Destino
      transactionData = {
        amount: totalAmount,
        crypto_hash: "",
        type: 2,
        exchange_fee: feePercent,
        status: "Finish",
        account_id: receiver_account.id,
        user_id: receiver_id,
        currency_id: receiver_account.currency_id,
        comments: comment,
      };
      await create_transaction(transactionData, transaction);
      await transaction.commit();

      if (fastify.io) {
        console.log("Pay User: ", receiver_id);
        fastify.io.in(receiver_id).emit("pay:payment_incoming", {
          type: transactionData.type,
          from: user.name,
          date: new Date(),
          comments: comment,
          amount: totalAmount,
          balance: receiver_account.balance,
        });
      }
      return res
        .status(200)
        .send({ success: true, message: "Pay success", data: result });
    } catch (error) {
      console.log(error);
      await transaction.rollback();
      return res.status(500).send({ success: false, message: error.message });
    }
  });
  fastify.get("/history", history);
};
