"use strict";

const db = require("../db/models");
const { challenges } = db;

async function create_challenge(data) {
  const [row, created] = await challenges.findOrCreate({
    where: { user_id: data.user_id },
    defaults: data,
  });
  return { row, created };
}

async function get_challenge(user_id) {
  const challenge = await challenges.findOne({
    where: { user_id },
    attributes: ["value"],
  });
  return challenge.value;
}

module.exports = {
  create_challenge,
  get_challenge,
};
