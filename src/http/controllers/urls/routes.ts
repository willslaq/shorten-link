import { FastifyInstance } from "fastify";
import { createShortenUrlController } from "./shorten-url.controller";
import { handleUserIfAuthenticated } from "@/http/middlewares/handle-user-if-authenticated";
import { redirectToOriginalUrlController } from "./redirect-to-original-url.controller";
import { deleteUrlController } from "./delete.controller";
import { editUrlController } from "./edit.controller";
import { searchUserUrlsController } from "./fetch-many.controller";
import { verifyJWT } from "@/http/middlewares/verify-jwt";

export async function urlsRoutes(app: FastifyInstance) {
  app.post(
    "/shorten-url",
    { onRequest: [handleUserIfAuthenticated] },
    createShortenUrlController
  );

  app.get("/:shortenUrl", redirectToOriginalUrlController);
  app.get("/user/urls", { onRequest: [verifyJWT] }, searchUserUrlsController);

  app.put("/urls/:id", editUrlController);

  app.delete("/urls/:id", deleteUrlController);
}
