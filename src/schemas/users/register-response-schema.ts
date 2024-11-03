export const registerResponseSchema = {
  201: {
    type: "object",
    properties: {
      token: {
        type: "string",
      },
    },
  },
  409: {
    type: "object",
    properties: {
      message: {
        type: "string",
      },
    },
  },
};
