import { FastifyInstance } from "fastify";
import { registerController } from "./register.controller";

export async function userRoutes(app: FastifyInstance) {
  app.post("/users", registerController);
}
