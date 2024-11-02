import { FastifyInstance } from "fastify";
import { registerController } from "./register.controller";
import { authenticateController } from "./authenticate.controller";
import { refreshTokenController } from "./refresh.controller";

export async function userRoutes(app: FastifyInstance) {
  app.post("/users", registerController);
  app.post("/sessions", authenticateController);

  app.patch('/token/refresh', refreshTokenController)
}
