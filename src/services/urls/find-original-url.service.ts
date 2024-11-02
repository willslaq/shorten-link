import { UrlsRepository } from "@/repositories/urls.repository";
import { Url } from "@prisma/client";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";

interface FindOriginalUrlServiceRequest {
  shortenUrl: string;
}

interface FindOriginalUrlServiceResponse {
  url: Url;
}

export class FindOriginalUrlService {
  constructor(private urlsRepository: UrlsRepository) {}

  async execute({
    shortenUrl,
  }: FindOriginalUrlServiceRequest): Promise<FindOriginalUrlServiceResponse> {
    const url = await this.urlsRepository.findByShortenUrl(shortenUrl);

    if (!url) {
      throw new ResourceNotFoundError();
    }

    return { url };
  }
}
