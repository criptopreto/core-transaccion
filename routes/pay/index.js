const { create_account, get_user_payment } = require("../../controllers/pay");
const { PaySchema } = require("../../validates/pay");

module.exports = async function (fastify, opts) {
  fastify.addHook("preHandler", fastify.auth([fastify.verifyJWT]));
  fastify.post("/account", create_account);
  fastify.post("/user_payment", PaySchema.userPaymentSchema, get_user_payment);
};
