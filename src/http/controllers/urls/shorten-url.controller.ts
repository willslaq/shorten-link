import { makeCreateUrlService } from "@/services/factories/make-create-url-service";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function createShortenUrlController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const createShortenUrlBodySchema = z.object({
    originalUrl: z.string().url(),
    expirationDate: z.coerce.date().optional(),
  });

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
