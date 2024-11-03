import { FastifyReply, FastifyRequest } from "fastify";
import { ResourceNotFoundError } from "@/services/errors/resource-not-found-error";
import { makeSearchManyUrlService } from "@/services/factories/make-search-many-url-service";
import { searchUsersUrlsQuerySchema } from "@/schemas/urls/search-user-urls-query-schema";

export async function searchUserUrlsController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const { query, page } = searchUsersUrlsQuerySchema.parse(request.query);

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
