import { FastifyReply, FastifyRequest } from "fastify";
import { ResourceNotFoundError } from "@/services/errors/resource-not-found-error";
import { makeDeleteUrlService } from "@/services/factories/make-delete-url-service";
import { deleteUrlParamsSchema } from "@/schemas/urls/delete-url-params-schema";

export async function deleteUrlController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const { id } = deleteUrlParamsSchema.parse(request.params);

  try {
    const deleteUrlService = makeDeleteUrlService();

    await deleteUrlService.execute({ id });

    return reply.status(200).send({ message: "URL deleted successfully" });
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: "URL not found" });
    }

    console.error(error);
    return reply.status(500).send({ message: "Internal server error" });
  }
}
