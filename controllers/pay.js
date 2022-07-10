const Pay = require("../services/pay_account");
const User = require("../services/user");
const db = require("../db/models");

module.exports = {
  create_account: async function (request, reply) {
    const { body } = request;
    const { user_id, currency_id } = body;
    const pay_id = await Pay.create_account({ user_id, currency_id });
    reply.status(200).send(pay_id);
  },

  get_user_payment: async function (request, reply) {
    const { payment_type, data } = request.body;
    try {
      if (
        payment_type === "email" ||
        (payment_type === "number" && data.length > 9)
      ) {
        let user_info = await User.findUserByPaymentMethod(data);
        let user_response = {};
        if (user_info) {
          user_response = {
            id: user_info.id,
            email: user_info.email,
            phone: user_info.phone,
            username: user_info.username,
            name: user_info.name,
            pay_id: user_info.pay_accounts[0].pay_id,
            pay_account: user_info.pay_accounts[0].id,
          };
        } else {
          return reply
            .status(404)
            .send({ success: false, message: "User not found" });
        }
        return reply.status(200).send({
          success: true,
          user: user_response,
          message: "Info correct",
        });
      } else if (payment_type === "number" && data.length < 10) {
        let user_info = await User.findUserByPayId(data);
        if (!user_info) {
          return reply
            .status(404)
            .send({ success: false, message: "User not found" });
        }
        let user_response = {
          id: user_info.id,
          email: user_info.email,
          phone: user_info.phone,
          username: user_info.username,
          name: user_info.name,
          pay_id: user_info.pay_accounts[0].pay_id,
          pay_account: user_info.pay_accounts[0].id,
        };
        return reply.status(200).send({
          success: true,
          user: user_response,
          message: "Info correct",
        });
      } else if (payment_type === "qr") {
        let data_struct = data.split(";");
        if (data_struct.length !== 2) {
          return reply
            .status(400)
            .send({ success: false, message: "Bad request" });
        }
        let type_data = parseInt(data_struct[0]);
        let data_qr = data_struct[1];

        if (type_data === 1) {
          // Pay ID
          let user_info = await User.findUserByPayId(data_qr);
          if (!user_info) {
            return reply
              .status(404)
              .send({ success: false, message: "User not found" });
          }
          let user_response = {
            id: user_info.id,
            email: user_info.email,
            phone: user_info.phone,
            username: user_info.username,
            name: user_info.name,
            pay_id: user_info.pay_accounts[0].pay_id,
            pay_account: user_info.pay_accounts[0].id,
          };
          return reply.status(200).send({
            success: true,
            user: user_response,
            message: "Info correct",
            type: type_data,
          });
        } else if (type_data === 2) {
          // Email
          let user_info = await User.findUserByPaymentMethod(data_qr);
          if (!user_info) {
            return reply
              .status(404)
              .send({ success: false, message: "User not found" });
          }
          let user_response = {
            id: user_info.id,
            email: user_info.email,
            phone: user_info.phone,
            username: user_info.username,
            name: user_info.name,
            pay_id: user_info.pay_accounts[0].pay_id,
            pay_account: user_info.pay_accounts[0].id,
          };
          return reply.status(200).send({
            success: true,
            user: user_response,
            message: "Info correct",
            type: type_data,
          });
        }
      }
      reply.status(404).send({ success: false, message: "Not found" });
    } catch (error) {
      reply.status(500).send({ success: false, message: error.message });
    }
  },
};
