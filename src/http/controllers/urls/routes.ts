import { FastifyInstance } from "fastify";
import { createShortenUrlController } from "./shorten-url.controller";
import { handleUserIfAuthenticated } from "@/http/middlewares/handle-user-if-authenticated";

export async function urlsRoutes(app: FastifyInstance) {
  app.post(
    "/shorten-url",
    { onRequest: [handleUserIfAuthenticated] },
    createShortenUrlController
  );
}
