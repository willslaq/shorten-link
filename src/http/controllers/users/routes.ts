import { FastifyInstance } from "fastify";
import { registerController } from "./register.controller";
import { authenticateController } from "./authenticate.controller";
import { refreshTokenController } from "./refresh.controller";
import { profileController } from "./profile.controller";
import { verifyJWT } from "@/http/middlewares/verify-jwt";
import { registerBodySchema } from "@/utils/schemas/register-body-schema";
import { zodToJsonSchema } from "@/utils/schemas/zod-to-json-schema";
import { authenticateBodySchema } from "@/utils/schemas/authenticate-body-schema";

export async function userRoutes(app: FastifyInstance) {
  app.post(
    "/users",
    {
      schema: {
        body: zodToJsonSchema(registerBodySchema),
        response: {
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
        },
      },
    },
    registerController
  );
  app.post(
    "/sessions",
    {
      schema: {
        body: zodToJsonSchema(authenticateBodySchema),
        reponse: {
          200: {
            type: "object",
            properties: {
              token: {
                type: "string",
              },
            },
          },
        },
      },
    },
    authenticateController
  );

  app.patch(
    "/token/refresh",
    {
      schema: {
        response: {
          200: {
            type: "object",
            properties: {
              token: {
                type: "string",
              },
            },
          },
        },
      },
    },
    refreshTokenController
  );

  app.get(
    "/me",
    {
      onRequest: [verifyJWT],
      schema: {
        response: {
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
        },
      },
    },
    profileController
  );
}
