"use strict";
const { mint, pay } = require("../../controllers/journal");
const { JournalSchema } = require("../../validates/journal");

module.exports = async function (fastify, opts) {
  fastify.post("/mint", mint);
  fastify.post("/pay", JournalSchema.paySchema, pay);
};
