const PaySchema = {
  userPaymentSchema: {
    schema: {
      description: "Get User destinatary information",
      tags: ["pay"],
      summary: "Get User information",
      body: {
        required: ["payment_type", "data"],
        type: "object",
        properties: {
          payment_type: {
            type: "string",
            description: "Type of payment: email, qr or number",
          },
          data: {
            type: "string",
            description: "User data to search, phone, email or pay id",
          },
        },
      },
      response: {
        200: {
          description: "User finded",
          type: "object",
          properties: {
            success: { type: "boolean" },
            message: { type: "string" },
            user: {
              type: "object",
              properties: {
                id: { type: "string" },
                email: { type: "string" },
                phone: { type: "string" },
                username: { type: "string" },
                name: { type: "string" },
                pay_id: { type: "string" },
                pay_account: { type: "string" },
              },
            },
            type: {
              type: "integer",
            },
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

module.exports = {
  PaySchema,
};
