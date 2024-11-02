import { UrlsRepository } from "@/repositories/urls.repository";
import { beforeEach, describe, expect, it } from "vitest";
import { CreateUrlService } from "./create-url.service";
import { InMemoryUrlsRepository } from "@/repositories/in-memory/in-memory-urls-repository";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";
import { DeleteAllUrlsByUserService } from "./delete-all-by-user-id.service";

let urlsRepository: UrlsRepository;
let createUrlService: CreateUrlService;
let deleteAllUrlsByUserService: DeleteAllUrlsByUserService;

describe("Delete All URLs By User Service", () => {
  beforeEach(() => {
    urlsRepository = new InMemoryUrlsRepository();
    createUrlService = new CreateUrlService(urlsRepository);
    deleteAllUrlsByUserService = new DeleteAllUrlsByUserService(urlsRepository);
  });

  it("should be able to delete all urls by user id", async () => {
    await createUrlService.execute({
      expirationDate: new Date(),
      originalUrl: "https://google.com.br",
      userId: "user-01",
    });

    await createUrlService.execute({
      expirationDate: new Date(),
      originalUrl: "https://example.com",
      userId: "user-01",
    });

    await deleteAllUrlsByUserService.execute({ userId: "user-01" });

    const urls = await urlsRepository.findByUserId("user-01", 1);
    expect(urls).toEqual([]);
  });

  it("should not be able to delete all urls if user has no urls", async () => {
    await expect(() =>
      deleteAllUrlsByUserService.execute({ userId: "non-existing-user" })
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
