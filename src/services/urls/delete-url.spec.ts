import { UrlsRepository } from "@/repositories/urls.repository";
import { beforeEach, describe, expect, it } from "vitest";
import { CreateUrlService } from "./create-url.service";
import { InMemoryUrlsRepository } from "@/repositories/in-memory/in-memory-urls-repository";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";
import { DeleteUrlService } from "./delete-url.service";

let urlsRepository: UrlsRepository;
let createUrlService: CreateUrlService;
let deleteUrlService: DeleteUrlService;

describe("Delete Url Service", () => {
  beforeEach(() => {
    urlsRepository = new InMemoryUrlsRepository();
    createUrlService = new CreateUrlService(urlsRepository);
    deleteUrlService = new DeleteUrlService(urlsRepository);
  });

  it("should be able to delete a url by id", async () => {
    const { url } = await createUrlService.execute({
      expirationDate: new Date(),
      originalUrl: "https://google.com.br",
      userId: "user-01",
    });

    await deleteUrlService.execute({ id: url.id });

    const deletedUrl = await urlsRepository.findById(url.id);
    expect(deletedUrl).toBeNull();
  });

  it("should not be able to delete a url if not found", async () => {
    await expect(() =>
      deleteUrlService.execute({ id: "non-existing-id" })
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
