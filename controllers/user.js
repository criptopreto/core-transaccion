const argon2 = require("argon2");
const db = require("../db/models");
const User = require("../services/user");
const Account = require("../services/pay_account");
const Currency = require("../services/currency");
const { generate_otp } = require("../helpers/otp");
const { OTPMailer } = require("../mailers/otpmailer");
module.exports = {
  create: async (req, res) => {
    const transaction = await db.sequelize.transaction();
    try {
      const userData = req.body;
      // Verify if the user already exists
      console.log("AQUI!!");
      let user_exits = await User.userExists(
        {
          email: userData.email,
          phone: userData.phone,
          username: userData.username,
          id_card: userData.id_card,
        },
        transaction
      );
      if (user_exits) {
        if (user_exits.email === userData.email) {
          await transaction.rollback();
          return res
            .status(422)
            .send({ success: false, message: "Email already registered" });
        }
        if (user_exits.phone === userData.phone) {
          await transaction.rollback();
          return res
            .status(422)
            .send({ success: false, message: "Phone already registered" });
        }
        if (user_exits.username === userData.username) {
          await transaction.rollback();
          return res
            .status(422)
            .send({ success: false, message: "Username already registered" });
        }
        if (user_exits.id_card === userData.id_card) {
          await transaction.rollback();
          return res
            .status(422)
            .send({ success: false, message: "ID card already registered" });
        }
      }

      // Generate name of the user
      userData.name = userData.first_name + " " + userData.last_name;

      // Generate OTP for the user
      userData.otp_email = generate_otp();

      // Hash the password
      try {
        userData.hash = await argon2.hash(userData.password);
        delete userData.password;
      } catch (err) {
        await transaction.rollback();
        return res
          .status(400)
          .send({ success: false, message: "Password is not valid" });
      }

      const { row, created } = await User.create(userData, transaction);

      if (created) {
        // Create a pay account for the user
        const currency_principal = await Currency.get_currency_principal();
        if (!currency_principal) {
          await transaction.rollback();
          return res.status(500).send({
            success: false,
            message:
              "Currency principal not found, please add currency before create users and accounts",
          });
        }
        await Account.create_account(
          {
            user_id: row.id,
            currency_id: currency_principal,
          },
          transaction
        );

        // Send email with OTP
        await new OTPMailer(row.email, row.otp_email).send();
        await transaction.commit();
        return res.status(200).send({ success: true, message: "User created" });
      } else {
        await transaction.rollback();
        return res.status(400).send({
          success: false,
          message: "Error al registrar el usuario, compruebe los datos",
        });
      }
    } catch (err) {
      console.error(err);
      await transaction.rollback();
      res.status(500).send({ success: false, message: err.message });
    }
  },
  verify_email: async (req, res) => {
    const { id, otp_email } = req.body;
    const transaction = await db.sequelize.transaction();
    try {
      const user = await User.setEmailVerified(id, otp_email, transaction);
      if (!user || !user[0]) {
        await transaction.rollback();
        return res.status(404).send({
          success: false,
          message: "Code invalid",
        });
      }
      await transaction.commit();

      return res.status(200).send({ success: true, message: "Email verified" });
    } catch (err) {
      console.error(err);
      await transaction.rollback();
      res.status(500).send({ success: false, message: err.message });
    }
  },
};
