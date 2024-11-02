import { UrlsRepository } from "@/repositories/urls.repository";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";

interface DeleteAllUrlsByUserServiceRequest {
  userId: string;
}

interface DeleteAllUrlsByUserServiceResponse {
  success: boolean;
}

export class DeleteAllUrlsByUserService {
  constructor(private urlsRepository: UrlsRepository) {}

  async execute({
    userId,
  }: DeleteAllUrlsByUserServiceRequest): Promise<DeleteAllUrlsByUserServiceResponse> {
    const urls = await this.urlsRepository.findByUserId(userId, 1);

    if (!urls || urls.length === 0) {
      throw new ResourceNotFoundError();
    }

    await this.urlsRepository.deleteAllByUserId(userId);

    return { success: true };
  }
}
