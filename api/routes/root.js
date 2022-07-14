"use strict";
module.exports = async function (fast, opts) {
  fast.get("/", async function (request, reply) {
    return { root: true };
  });
};
