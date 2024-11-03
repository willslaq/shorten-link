import { FastifyReply, FastifyRequest } from "fastify";
import { makeEditUrlService } from "@/services/factories/make-edit-url-service";
import { ResourceNotFoundError } from "@/services/errors/resource-not-found-error";
import { editUrlParamsSchema } from "@/schemas/urls/edit-url-params-schema";
import { editUrlBodySchema } from "@/schemas/urls/edit-url-body-schema";

export async function editUrlController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const { id } = editUrlParamsSchema.parse(request.params);
  const { originalUrl, expirationDate } = editUrlBodySchema.parse(request.body);

  try {
    const editUrlService = makeEditUrlService();

    const { url } = await editUrlService.execute({
      id,
      originalUrl,
      expirationDate: expirationDate ? new Date(expirationDate) : undefined,
    });

    return reply.status(200).send({ url });
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: "URL not found" });
    }

    console.error(error);
    return reply.status(500).send({ message: "Internal server error" });
  }
}
