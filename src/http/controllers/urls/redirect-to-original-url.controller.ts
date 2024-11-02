import { UrlExpiredError } from "@/services/errors/url-expired-error";
import { makeFindOriginalUrlService } from "@/services/factories/make-find-original-url-service";
import { makeIncrementClickCountService } from "@/services/factories/make-incremment-clicl-count-service";
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
    const incrementClickCountService = makeIncrementClickCountService();

    const { url } = await findOriginalUrlService.execute({
      shortenUrl,
    });

    await incrementClickCountService.execute({
      shortenUrl,
    });

    return reply.redirect(url.original_url);
  } catch (error) {
    if (error instanceof UrlExpiredError) {
      return reply.status(410).send({ message: "URL has expired" });
    }

    console.error(error);
    return reply.status(404).send({ message: "URL not found" });
  }
}
