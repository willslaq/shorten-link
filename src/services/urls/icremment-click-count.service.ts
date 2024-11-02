import { UrlsRepository } from "@/repositories/urls.repository";
import { Url } from "@prisma/client";

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

    return { url };
  }
}
