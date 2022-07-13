"use strict";

const path = require("path");
const AutoLoad = require("@fastify/autoload");
const db = require("./db/models");
const chalk = require("chalk");
const fastifyAuth = require("@fastify/auth");

module.exports = async function (fastify, opts) {
  // Place here your custom code!
  fastify.register(require("@fastify/jwt"), {
    secret: process.env.JWT_KEY,
  });

  fastify.register(require("@fastify/helmet"));
  fastify.register(require("@fastify/cors"));
  fastify.register(require("@fastify/compress"));

  fastify.register(require("fastify-socket.io"), {
    cors: {
      origin: "*",
    },
  });

  fastify
    .decorate("verifyJWT", function (req, res, done) {
      const { authorization } = req.headers;
      if (!authorization) {
        return done(new Error("No token"));
      }
      let token = authorization.split(" ")[1];
      fastify.jwt.verify(token, (err, decoded) => {
        if (err) {
          return done(err);
        }
        req.user = decoded.user.id;
        done();
      });
    })
    .register(fastifyAuth);

  fastify.register(require("@fastify/swagger"), {
    routePrefix: "/docs",
    openapi: {
      info: {
        title: "Test swagger",
        description: "testing the fastify swagger api",
        version: "0.1.0",
      },
      host: "localhost:3000",
      schemes: ["http"],

      components: {
        securitySchemes: {
          apiKey: {
            type: "apiKey",
            name: "apiKey",
            in: "header",
          },
        },
      },
    },
    exposeRoute: true,
    staticCSP: true,
    transformStaticCSP: (header) => header,
    exposeRoute: true,
  });

  fastify.register(AutoLoad, {
    dir: path.join(__dirname, "plugins"),
    options: Object.assign({}, opts),
  });
  // This loads all plugins defined in routes
  // define your routes in one of these
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, "routes"),
    options: Object.assign({}, opts),
  });

  try {
    await db.sequelize.authenticate();

    console.log(
      chalk.green("Database connection is successfully established.")
    );
  } catch (error) {
    console.log("Error al intentar conectar con la BD: ", error);
    fastify.log.error(error);
    process.exit(1);
  }

  fastify.ready((err) => {
    if (err) {
      console.log("Err");
    }

    require("./tools/socket/")(fastify);
  });
};
