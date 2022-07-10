const JournalSchema = {
  paySchema: {
    schema: {
      description: "Transfer money to User",
      tags: ["pay"],
      summary: "Pay to User",
      body: {
        required: ["amount", "user_id", "receiver_id", "comment", "currency"],
        type: "object",
        properties: {
          amount: {
            type: "number",
            description: "Amount",
          },
          fee: {
            type: "boolean",
            description: "¿Apply fee? default: false",
            default: false,
          },
          user_id: {
            type: "string",
            description: "User id from origin",
          },
          receiver_id: {
            type: "string",
            description: "User id to receive",
          },
          comment: {
            type: "string",
            description: "Comment",
          },
          currency: {
            type: "string",
            description: "ID Currency of wallet",
          },
        },
      },
      response: {
        200: {
          description: "Payment success",
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
};

module.exports = {
  JournalSchema,
};
