export const deleteUrlResponseSchema = {
  200: {
    type: "object",
    properties: {
      message: { type: "string" },
    },
  },
  404: {
    type: "object",
    properties: {
      message: { type: "string" },
    },
  },
  500: {
    type: "object",
    properties: {
      message: { type: "string" },
    },
  },
};
