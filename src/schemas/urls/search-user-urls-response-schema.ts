export const searchUserUrlsResponseSchema = {
  200: {
    type: "object",
    properties: {
      urls: {
        type: "array",
        items: {
          type: "object",
          properties: {
            id: { type: "string" },
            updated_at: { type: "string", format: "date-time" },
            created_at: { type: "string", format: "date-time" },
            original_url: { type: "string" },
            shorten_url: { type: "string" },
            click_count: { type: "number" },
            expiration_date: { type: "string", format: "date-time" },
            deleted_at: { type: ["string", "null"], format: "date-time" },
            user_id: { type: ["string", "null"] },
          },
        },
      },
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