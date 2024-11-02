import { FastifyInstance } from "fastify";
import { createShortenUrlController } from "./shorten-url.controller";
import { handleUserIfAuthenticated } from "@/http/middlewares/handle-user-if-authenticated";
import { redirectToOriginalUrlController } from "./redirect-to-original-url.controller";

export async function urlsRoutes(app: FastifyInstance) {
  app.post(
    "/shorten-url",
    { onRequest: [handleUserIfAuthenticated] },
    createShortenUrlController
  );

  app.get("/:shortenUrl", redirectToOriginalUrlController);
}
