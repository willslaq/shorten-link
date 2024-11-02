import { FastifyInstance } from "fastify";
import { registerController } from "./register.controller";
import { authenticateController } from "./authenticate.controller";
import { refreshTokenController } from "./refresh.controller";
import { profileController } from "./profile.controller";
import { verifyJWT } from "@/http/middlewares/verify-jwt";

export async function userRoutes(app: FastifyInstance) {
  app.post("/users", registerController);
  app.post("/sessions", authenticateController);

  app.patch("/token/refresh", refreshTokenController);

  app.get("/me", { onRequest: [verifyJWT] }, profileController);
}
