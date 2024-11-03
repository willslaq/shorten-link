export const authenticateResponseSchema = {
  200: {
    type: "object",
    properties: {
      token: {
        type: "string",
      },
    },
  },
};
