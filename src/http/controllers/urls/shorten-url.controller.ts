import { createShortenUrlBodySchema } from "@/schemas/urls/create-shorten-url-body-schema";
import { makeCreateUrlService } from "@/services/factories/make-create-url-service";
import { FastifyReply, FastifyRequest } from "fastify";

export async function createShortenUrlController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  

  const { originalUrl, expirationDate } = createShortenUrlBodySchema.parse(
    request.body
  );

  console.log(request.user);

  try {
    const createUrlService = makeCreateUrlService();

    console.log(request.user?.sub);

    const userId = request.user?.sub || undefined;

    const { url } = await createUrlService.execute({
      originalUrl,
      expirationDate,
      userId,
    });

    return reply.status(201).send({ url });
  } catch (error) {
    console.error(error);

    return reply.status(500).send({ message: "Internal Server Error" });
  }
}
