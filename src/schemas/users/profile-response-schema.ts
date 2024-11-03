export const profileResponseSchema = {
  200: {
    type: "object",
    properties: {
      user: {
        type: "object",
        properties: {
          id: {
            type: "string",
          },
          name: {
            type: "string",
          },
          email: {
            type: "string",
          },
          last_login: {
            type: "string",
          },
          updated_at: {
            type: "string",
          },
          created_at: {
            type: "string",
          },
        },
      },
    },
  },
};
