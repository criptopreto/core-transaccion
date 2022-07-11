"use strict";
const { get_user_info } = require("../../controllers/user");

module.exports = async function (fastify, opts) {
  fastify.addHook("preHandler", fastify.auth([fastify.verifyJWT]));
  fastify.get("/", get_user_info);
};
