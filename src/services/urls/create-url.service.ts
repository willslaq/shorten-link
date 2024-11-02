import { UrlsRepository } from "@/repositories/urls.repository";
import { generateShortUrl } from "@/utils/generate-short-url";
import { Url } from "@prisma/client";

interface CreateUrlServiceRequest {
  originalUrl: string;
  expirationDate: Date;
  userId: string;
}

interface CreateUrlServiceResponse {
  url: Url;
}
export class CreateUrlService {
  constructor(private urlsRepository: UrlsRepository) {}

  async execute({
    expirationDate,
    originalUrl,
    userId,
  }: CreateUrlServiceRequest): Promise<CreateUrlServiceResponse> {
    const shortenUrl = generateShortUrl();

    const url = await this.urlsRepository.create({
      original_url: originalUrl,
      shorten_url: shortenUrl,
      expiration_date: expirationDate,
      user_id: userId,
    });

    return { url };
  }
}
