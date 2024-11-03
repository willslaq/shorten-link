import { FastifyInstance } from "fastify";
import { registerController } from "./register.controller";
import { authenticateController } from "./authenticate.controller";
import { refreshTokenController } from "./refresh.controller";
import { profileController } from "./profile.controller";
import { verifyJWT } from "@/http/middlewares/verify-jwt";
import { registerBodySchema } from "@/schemas/users/register-body-schema";
import { zodToJsonSchema } from "@/schemas/zod-to-json-schema";
import { authenticateBodySchema } from "@/schemas/users/authenticate-body-schema";
import { authenticateResponseSchema } from "@/schemas/users/authenticate-response-schema";
import { refreshTokenResponseSchema } from "@/schemas/users/refresh-token-response-schema";
import { registerResponseSchema } from "@/schemas/users/register-response-schema";
import { profileResponseSchema } from "@/schemas/users/profile-response-schema";

export async function userRoutes(app: FastifyInstance) {
  app.post(
    "/users",
    {
      schema: {
        body: zodToJsonSchema(registerBodySchema),
        response: registerResponseSchema,
      },
    },
    registerController
  );
  app.post(
    "/sessions",
    {
      schema: {
        body: zodToJsonSchema(authenticateBodySchema),
        reponse: authenticateResponseSchema,
      },
    },
    authenticateController
  );

  app.patch(
    "/token/refresh",
    {
      schema: {
        response: refreshTokenResponseSchema,
      },
    },
    refreshTokenController
  );

  app.get(
    "/me",
    {
      onRequest: [verifyJWT],
      schema: {
        response: profileResponseSchema,
      },
    },
    profileController
  );
}
