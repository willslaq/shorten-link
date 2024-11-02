import { UrlsRepository } from "@/repositories/urls.repository";
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
    const shortenUrl = Math.random().toString(36).slice(2, 8);

    const url = await this.urlsRepository.create({
      original_url: originalUrl,
      shorten_url: shortenUrl,
      expiration_date: expirationDate,
      user_id: userId,
    });

    return { url };
  }
}
