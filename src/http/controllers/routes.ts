import { FastifyInstance } from "fastify";
import { registerController } from "./register.controller";
import { authenticateController } from "./authenticate.controller";

export async function userRoutes(app: FastifyInstance) {
  app.post("/users", registerController);
  app.post("/sessions", authenticateController);
  
}
