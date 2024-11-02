import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { ResourceNotFoundError } from "@/services/errors/resource-not-found-error";
import { makeDeleteUrlService } from "@/services/factories/make-delete-url-service";

export async function deleteUrlController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const paramsSchema = z.object({
    id: z.string().uuid(),
  });

  const { id } = paramsSchema.parse(request.params);

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
