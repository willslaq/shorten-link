import { UrlsRepository } from "@/repositories/urls.repository";
import { Url } from "@prisma/client";

interface SearchManyUrlServiceRequest {
  userId: string;
  query?: string;
  page: number;
}

interface SearchManyUrlServiceResponse {
  urls: Url[] | null;
}

export class SearchManyUrlService {
  constructor(private urlsRepository: UrlsRepository) {}

  async execute({
    userId,
    query,
    page,
  }: SearchManyUrlServiceRequest): Promise<SearchManyUrlServiceResponse> {
    const urls = await this.urlsRepository.searchMany(userId, page, query);

    return { urls };
  }
}
