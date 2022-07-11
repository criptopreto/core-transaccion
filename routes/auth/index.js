"use strict";

const AuthSchema = require("../../validates/auth");
const { create, verify_email, signin } = require("../../controllers/user");
const { handshake_jwt } = require("../../controllers/auth");

module.exports = async function (fastify, opts) {
  fastify.post("/signup", AuthSchema.signUpSchema, create);
  fastify.post("/signin", AuthSchema.signInSchema, signin);
  fastify.post("/verify_email", AuthSchema.validateEmailSchema, verify_email);
  fastify.post("/handshake", handshake_jwt);
};
