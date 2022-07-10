"use strict";

const db = require("../db/models");
const { currencies } = db;

async function create_currency(data) {
  const [row, created] = await currencies.findOrCreate({
    where: { symbol: data.symbol },
    defaults: data,
  });
  return { row, created };
}

async function get_currencies() {
  const currencies = await currencies.findAll();
  return currencies;
}

async function get_currency_value(symbol) {
  const currency = await currencies.findOne({
    where: { symbol },
    attributes: ["value"],
  });
  return currency.value;
}

async function update_currency_value(symbol, value) {
  return await currencies.update({ value }, { where: { symbol } });
}

async function get_currency_symbol(id) {
  const currency = await currencies.findOne({
    where: { id },
    attributes: ["symbol"],
  });
  return currency.symbol;
}

async function get_currency_principal() {
  const currency = await currencies.findOne({
    where: { principal: true },
    attributes: ["id"],
  });
  return currency?.id;
}

module.exports = {
  create_currency,
  get_currencies,
  get_currency_value,
  update_currency_value,
  get_currency_symbol,
  get_currency_principal,
};
