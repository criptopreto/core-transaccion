"use strict";

const db = require("../db/models");
const { generate_pay_id } = require("../helpers/pay");
const { pay_accounts } = db;

async function create_account(data, transaction) {
  let duplicate = true;
  let user_id = data.user_id;
  let offset_digit = 1;
  let pay_id = "";
  while (duplicate) {
    pay_id = generate_pay_id(user_id);
    const account = await pay_accounts.findOne({ where: { pay_id } });
    if (!account) {
      duplicate = false;
    } else {
      offset = offset_digit.toString(16);
      offset = offset.padStart(2, "0");

      user_id = user_id.slice(0, -2) + offset;
      offset_digit++;
    }
  }
  data.pay_id = pay_id;
  const [row, created] = await pay_accounts.findOrCreate({
    where: { pay_id: data.pay_id },
    defaults: data,
    transaction: transaction,
  });
  return { row, created };
}

module.exports = {
  create_account,
};
