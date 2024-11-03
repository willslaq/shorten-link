import { FastifyInstance } from "fastify";
import { createShortenUrlController } from "./shorten-url.controller";
import { handleUserIfAuthenticated } from "@/http/middlewares/handle-user-if-authenticated";
import { redirectToOriginalUrlController } from "./redirect-to-original-url.controller";
import { deleteUrlController } from "./delete.controller";
import { editUrlController } from "./edit.controller";
import { searchUserUrlsController } from "./fetch-many.controller";
import { verifyJWT } from "@/http/middlewares/verify-jwt";
import { createShortenUrlResponseSchema } from "@/schemas/urls/create-shorten-url-response-schema";
import { createShortenUrlBodySchema } from "@/schemas/urls/create-shorten-url-body-schema";
import { zodToJsonSchema } from "@/schemas/zod-to-json-schema";
import { editUrlResponseSchema } from "@/schemas/urls/edit-url-response-schema";
import { editUrlParamsSchema } from "@/schemas/urls/edit-url-params-schema";
import { deleteUrlResponseSchema } from "@/schemas/urls/delete-url-response-schema";
import { deleteUrlParamsSchema } from "@/schemas/urls/delete-url-params-schema";
import { searchUsersUrlsQuerySchema } from "@/schemas/urls/search-user-urls-query-schema";
import { searchUserUrlsResponseSchema } from "@/schemas/urls/search-user-urls-response-schema";
import { redirectToOriginalUrlResponseSchema } from "@/schemas/urls/redirect-to-original-url-response-schema";
import { redirectToOriginalUrlParamsSchema } from "@/schemas/urls/redirect-to-original-url-params-schema";

export async function urlsRoutes(app: FastifyInstance) {
  app.post(
    "/shorten-url",
    {
      onRequest: [handleUserIfAuthenticated],
      schema: {
        body: zodToJsonSchema(createShortenUrlBodySchema),
        response: createShortenUrlResponseSchema,
      },
    },
    createShortenUrlController
  );

  app.get(
    "/:shortenUrl",
    {
      schema: {
        params: zodToJsonSchema(redirectToOriginalUrlParamsSchema),
        response: redirectToOriginalUrlResponseSchema,
      },
    },
    redirectToOriginalUrlController
  );
  app.get(
    "/user/urls",
    {
      onRequest: [verifyJWT],
      schema: {
        querystring: zodToJsonSchema(searchUsersUrlsQuerySchema),
        response: searchUserUrlsResponseSchema,
      },
    },
    searchUserUrlsController
  );

  app.put(
    "/urls/:id",
    {
      schema: {
        params: zodToJsonSchema(editUrlParamsSchema),
        body: zodToJsonSchema(createShortenUrlBodySchema),
        response: editUrlResponseSchema,
      },
    },
    editUrlController
  );

  app.delete(
    "/urls/:id",
    {
      schema: {
        params: zodToJsonSchema(deleteUrlParamsSchema),
        response: deleteUrlResponseSchema,
      },
    },
    deleteUrlController
  );
}
