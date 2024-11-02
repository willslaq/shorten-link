import { makeFindOriginalUrlService } from "@/services/factories/make-find-original-url-service";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function redirectToOriginalUrlController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const paramsSchema = z.object({
    shortenUrl: z.string(),
  });

  const { shortenUrl } = paramsSchema.parse(request.params);

  try {
    const findOriginalUrlService = makeFindOriginalUrlService();

    const { url } = await findOriginalUrlService.execute({
      shortenUrl,
    });

    return reply.redirect(url.original_url);
  } catch (error) {
    console.error(error);
    return reply.status(404).send({ message: "URL not found" });
  }
}
