export const refreshTokenResponseSchema = {
  200: {
    type: "object",
    properties: {
      token: {
        type: "string",
      },
    },
  },
};
