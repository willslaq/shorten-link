import { UrlsRepository } from "@/repositories/urls.repository";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";
import { Url } from "@prisma/client";

interface DeleteUrlServiceRequest {
  id: string;
}

interface DeleteUrlServiceResponse {
  url: Url;
}

export class DeleteUrlService {
  constructor(private urlsRepository: UrlsRepository) {}

  async execute({
    id,
  }: DeleteUrlServiceRequest): Promise<DeleteUrlServiceResponse> {
    const url = await this.urlsRepository.findById(id);

    if (!url) {
      throw new ResourceNotFoundError();
    }

    await this.urlsRepository.deleteById(id);

    return { url };
  }
}
