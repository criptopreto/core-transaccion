"use strict";

const {
  save_challenge,
  get_challenge,
  save_credential,
  get_credential,
} = require("../../../controllers/auth");

module.exports = async function (fastify, opts) {
  //fastify.addHook("preHandler", fastify.auth([fastify.verifyJWT]));
  fastify.post("/challenge", save_challenge);
  fastify.post("/get_challenge", get_challenge);
  fastify.post("/credential", save_credential);
  fastify.post("/get_credential", get_credential);
};
