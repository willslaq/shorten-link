import { UrlsRepository } from "@/repositories/urls.repository";
import { Url } from "@prisma/client";
import { UrlExpiredError } from "../errors/url-expired-error";

interface IncremmentClickCountServiceRequest {
  shortenUrl: string;
}

interface IncremmentClickCountServiceResponse {
  url: Url;
}

export class IncremmentClickCountService {
  constructor(private urlsRepository: UrlsRepository) {}

  async execute({
    shortenUrl,
  }: IncremmentClickCountServiceRequest): Promise<IncremmentClickCountServiceResponse> {
    const url = await this.urlsRepository.incrementVisits(shortenUrl);

    if (new Date() > url.expiration_date) {
      throw new UrlExpiredError();
    }

    return { url };
  }
}
