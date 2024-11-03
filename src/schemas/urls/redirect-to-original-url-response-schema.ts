export const redirectToOriginalUrlResponseSchema = {
  410: {
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
};
