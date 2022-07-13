"use strict";

const db = require("../db/models");
const { transactions } = db;

async function create_transaction(data, transaction) {
  const result = await transactions.create(data, transaction);
  return result;
}

module.exports = {
  create_transaction,
};
