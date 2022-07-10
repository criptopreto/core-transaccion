"use strict";

const db = require("../db/models");
const Op = db.Sequelize.Op;
const { users } = db;

async function create(data, transaction) {
  const [row, created] = await users.findOrCreate({
    where: { email: data.email },
    defaults: data,
    transaction: transaction,
  });
  return { row, created };
}

async function findByEmail(email) {
  return await users.findOne({ where: { email } });
}

async function userExists({ email, phone, username, id_card }, transaction) {
  let user = await users.findOne({
    where: { [Op.or]: [{ email }, { phone }, { username }, { id_card }] },
    attributes: ["id", "email", "phone", "username", "id_card"],
    transaction: transaction,
  });
  if (user) {
    return user;
  }
  return null;
}

async function getAll() {
  return await users.findAll({ attributes: { exclude: ["hash"] } });
}

async function findById(id, transaction) {
  return await users.findOne({ where: { id }, transaction: transaction });
}

async function findByIdIncludeAccounts(id, transaction) {
  return await users.findOne({
    where: { id },
    include: [{ model: db.pay_accounts }],
    transaction: transaction,
  });
}

async function findUserByPayId(PayId) {
  let user = await users.findOne({
    include: [{ model: db.pay_accounts, where: { pay_id: PayId } }],
  });
  if (user) {
    return user.toJSON();
  } else {
    return null;
  }
}

async function findUserByPaymentMethod(payment_method) {
  let user = await users.findOne({
    where: { [Op.or]: [{ email: payment_method }, { phone: payment_method }] },
    include: [{ model: db.pay_accounts }],
  });
  if (user) {
    return user.toJSON();
  } else {
    return null;
  }
}

async function findByIdAndCurrency(id, currency_id, transaction) {
  return await users.findOne({
    where: { id },
    include: [
      {
        model: db.pay_accounts,
        where: { currency_id: currency_id },
      },
    ],
    transaction: transaction,
  });
}

async function setEmailVerified(id, otp_email, transaction) {
  return await users.update(
    { email_verified: true },
    { where: { [Op.and]: [{ id }, { otp_email }] }, transaction: transaction }
  );
}

async function setPhoneVerified(id) {
  return await users.update({ phone_verified: true }, { where: { id } });
}

async function update(id, data) {
  return await users.update(data, { where: { id } });
}

async function updatePassword(id, password) {
  return await users.update({ hash: password }, { where: { id } });
}

module.exports = {
  create,
  findByEmail,
  getAll,
  findById,
  setEmailVerified,
  setPhoneVerified,
  update,
  updatePassword,
  userExists,
  findByIdIncludeAccounts,
  findByIdAndCurrency,
  findUserByPaymentMethod,
  findUserByPayId,
};
