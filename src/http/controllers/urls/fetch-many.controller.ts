import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { ResourceNotFoundError } from "@/services/errors/resource-not-found-error";
import { makeSearchManyUrlService } from "@/services/factories/make-search-many-url-service";

export async function searchUserUrlsController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const querySchema = z.object({
    query: z.string().optional(),
    page: z.coerce.number().optional().default(1),
  });

  const { query, page } = querySchema.parse(request.query);

  try {
    const userId = request.user.sub;

    const searchManyUrlService = makeSearchManyUrlService();

    const { urls } = await searchManyUrlService.execute({
      userId,
      query,
      page,
    });

    if (!urls || !urls.length) {
      throw new ResourceNotFoundError();
    }

    return reply.status(200).send({ urls });
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: "No URLs found for this user" });
    }

    console.error(error);
    return reply.status(500).send({ message: "Internal server error" });
  }
}
