import { beforeEach, describe, expect, it } from "vitest";
import { UrlsRepository } from "@/repositories/urls.repository";
import { InMemoryUrlsRepository } from "@/repositories/in-memory/in-memory-urls-repository";
import { FindOriginalUrlService } from "./find-original-url.service";
import { ResourceNotFoundError } from "@/services/errors/resource-not-found-error";

let urlsRepository: UrlsRepository;
let findOriginalUrlService: FindOriginalUrlService;

describe("FindOriginalUrlService", () => {
  beforeEach(() => {
    urlsRepository = new InMemoryUrlsRepository();
    findOriginalUrlService = new FindOriginalUrlService(urlsRepository);
  });

  it("should be able to find the original URL by shortened URL", async () => {
    const url = await urlsRepository.create({
      original_url: "https://example.com",
      shorten_url: "short123",
      expiration_date: new Date(),
      user_id: "user-01",
    });

    const result = await findOriginalUrlService.execute({
      shortenUrl: url.shorten_url,
    });

    expect(result.url.original_url).toEqual("https://example.com");
  });

  it("should throw an error if the shortened URL does not exist", async () => {
    await expect(() =>
      findOriginalUrlService.execute({
        shortenUrl: "non-existing-url",
      })
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });

  it("should throw an error if the URL is deleted", async () => {
    const url = await urlsRepository.create({
      original_url: "https://example.com",
      shorten_url: "short123",
      expiration_date: new Date(),
      user_id: "user-01",
    });

    await urlsRepository.deleteById(url.id);

    await expect(() =>
      findOriginalUrlService.execute({
        shortenUrl: "short123",
      })
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
