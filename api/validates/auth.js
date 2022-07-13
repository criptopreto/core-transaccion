const AuthSchemas = {
  signUpSchema: {
    schema: {
      description: "Register new user with email and password",
      tags: ["users"],
      summary: "Register new user",
      body: {
        required: [
          "email",
          "password",
          "first_name",
          "last_name",
          "id_card",
          "phone",
          "username",
        ],
        type: "object",
        properties: {
          email: {
            type: "string",
            format: "email",
            description: "User email",
          },
          password: {
            type: "string",
            minLength: 8,
            description: "User password",
          },
          username: {
            type: "string",
            minLength: 5,
            description: "Nick in the system",
          },
          first_name: {
            type: "string",
            minLength: 3,
            maxLength: 70,
            description: "User first name",
          },
          last_name: {
            type: "string",
            minLength: 3,
            maxLength: 75,
            description: "User last name",
          },
          id_card: {
            type: "string",
            minLength: 5,
            maxLength: 20,
            description: "User id card",
          },
          phone: {
            type: "string",
            minLength: 10,
            maxLength: 25,
            description: "User phone with country code",
          },
        },
      },
      response: {
        200: {
          description: "User created",
          type: "object",
          properties: {
            success: { type: "boolean" },
            message: { type: "string" },
          },
        },
        400: {
          description: "Bad request",
          type: "object",
          properties: {
            success: { type: "boolean" },
            message: { type: "string" },
          },
        },
        500: {
          description: "Internal server error",
          type: "object",
          properties: {
            success: { type: "boolean" },
            message: { type: "string" },
          },
        },
      },
    },
  },
  validateEmailSchema: {
    schema: {
      description: "Validate email",
      tags: ["users"],
      summary: "Validate email",
      body: {
        required: ["id", "otp_email"],
        type: "object",
        properties: {
          id: {
            type: "string",
            description: "User id",
          },
          otp_email: {
            type: "string",
            description: "User otp email",
          },
        },
      },
      response: {
        200: {
          description: "Email verified",
          type: "object",
          properties: {
            success: { type: "boolean" },
            message: { type: "string" },
          },
        },
        400: {
          description: "Bad request",
          type: "object",
          properties: {
            success: { type: "boolean" },
            message: { type: "string" },
          },
        },
        500: {
          description: "Internal server error",
          type: "object",
          properties: {
            success: { type: "boolean" },
            message: { type: "string" },
          },
        },
      },
    },
  },
  signInSchema: {
    schema: {
      description: "Login user with email and password",
      tags: ["users"],
      summary: "Login user",
      body: {
        required: ["username", "password"],
        type: "object",
        properties: {
          username: {
            type: "string",
            description: "User username",
          },
          password: {
            type: "string",
            minLength: 8,
            description: "User password",
          },
        },
      },
      response: {
        200: {
          description: "User logged",
          type: "object",
          properties: {
            success: { type: "boolean" },
            message: { type: "string" },
            token: { type: "string" },
          },
        },
        400: {
          description: "Bad request",
          type: "object",
          properties: {
            success: { type: "boolean" },
            message: { type: "string" },
          },
        },
        500: {
          description: "Internal server error",
          type: "object",
          properties: {
            success: { type: "boolean" },
            message: { type: "string" },
          },
        },
      },
    },
  },
};

module.exports = AuthSchemas;
