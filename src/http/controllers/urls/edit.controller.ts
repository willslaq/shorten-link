import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeEditUrlService } from "@/services/factories/make-edit-url-service";
import { ResourceNotFoundError } from "@/services/errors/resource-not-found-error";

export async function editUrlController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const paramsSchema = z.object({
    id: z.string().uuid(),
  });

  const bodySchema = z.object({
    originalUrl: z.string().optional(),
    expirationDate: z.string().optional(),
  });

  const { id } = paramsSchema.parse(request.params);
  const { originalUrl, expirationDate } = bodySchema.parse(request.body);

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
