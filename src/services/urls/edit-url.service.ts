import { UrlsRepository } from "@/repositories/urls.repository";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";
import { Url } from "@prisma/client";

interface EditUrlServiceRequest {
  id: string;
  originalUrl?: string;
  expiradionDate?: Date;
}

interface EditUrlServiceResponse {
  url: Url;
}

export class EditUrlService {
  constructor(private urlsRepository: UrlsRepository) {}

  async execute({
    id,
    originalUrl,
    expiradionDate,
  }: EditUrlServiceRequest): Promise<EditUrlServiceResponse> {
    const url = await this.urlsRepository.findById(id);

    if (!url) {
      throw new ResourceNotFoundError();
    }

    url.original_url = originalUrl ?? url.original_url;
    url.expiration_date = expiradionDate ?? url.expiration_date;

    await this.urlsRepository.save(url);

    return { url };
  }
}
