const fastify = require("fastify")();
const db = require("../db/models/");
const timeDelta = require("time-delta");

let Session = db.sessions;
let Challenge = db.challenges;

module.exports = {
  handshake_jwt: async (req, res) => {
    try {
      let { session_token, user_id } = req.body;

      if (!session_token) {
        return res
          .status(422)
          .send({ success: false, message: "No session token" });
      }

      let session = await Session.findOne({ where: { session_token } });

      if (!session) {
        return res
          .status(422)
          .send({ success: false, message: "Session token not found" });
      }

      let instance = timeDelta.create({ locale: "en" });
      let expires = instance.format(Date.now(), session.expires, {
        unitType: "short",
        span: 1,
      });

      if (expires.includes("mth") || expires.includes("mths")) {
        let month = expires.split(" ")[0];
        let days = month * 30;
        expires = `${days} d`;
      }

      expires = expires.replace("day", "d");
      expires = expires.replace("days", "d");
      expires = expires.replace(" ", "");

      let token = await res.jwtSign(
        {
          session_token,
          user_id: session.user_id,
        },
        {
          expiresIn: expires,
          iss: "api.moneyapp.pro",
        }
      );
      res.status(201).send(token);
    } catch (error) {
      console.log(error);
      res.status(500).send({ success: false, message: error });
    }
  },
  save_challenge: async (req, res) => {
    try {
      let { user_id, challenge } = req.body;

      Challenge.findOrCreate({
        where: { user_id },
        defaults: {
          user_id,
          value: challenge,
        },
      });
      return res.status(201).send({ success: true });
    } catch (error) {
      console.log(error);
      return res.status(500).send({ success: false, message: error });
    }
  },
  get_challenge: async (req, res) => {
    try {
      let { user_id } = req.body;

      let challenge = await Challenge.findOne({
        where: { user_id },
        attributes: ["value"],
      });
      if (!challenge) {
        return res.status(422).send(null);
      }
      return res.status(201).send(challenge.value);
    } catch (error) {
      console.log(error);
      return res.status(500).send(null);
    }
  },
  save_credential: async (req, res) => {
    try {
      let data = req.body;

      let newCredential = await db.credentials.create(data);
      return res.status(201).send(newCredential);
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }
  },
  get_credential: async (req, res) => {
    try {
      let { user_id } = req.body;

      let credential = await db.credentials.findAll({
        where: { user_id },
      });
      if (!credential) {
        return res.status(422).send([]);
      }
      return res.status(201).send(credential);
    } catch (error) {
      console.log(error);
      return res.status(500).send([]);
    }
  },
};
