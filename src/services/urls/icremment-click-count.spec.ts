import { UrlsRepository } from "@/repositories/urls.repository";
import { beforeEach, describe, expect, it } from "vitest";
import { CreateUrlService } from "./create-url.service";
import { InMemoryUrlsRepository } from "@/repositories/in-memory/in-memory-urls-repository";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";
import { IncremmentClickCountService } from "./icremment-click-count.service";

let urlsRepository: UrlsRepository;
let createUrlService: CreateUrlService;
let incrementClickCountService: IncremmentClickCountService;

describe("Increment Click Count Service", () => {
  beforeEach(() => {
    urlsRepository = new InMemoryUrlsRepository();
    createUrlService = new CreateUrlService(urlsRepository);
    incrementClickCountService = new IncremmentClickCountService(
      urlsRepository
    );
  });

  it("should be able to increment click count", async () => {
    const { url } = await createUrlService.execute({
      expirationDate: new Date(),
      originalUrl: "https://google.com.br",
      userId: "user-01",
    });

    const { url: updatedUrl } = await incrementClickCountService.execute({
      shortenUrl: url.shorten_url,
    });

    expect(updatedUrl.click_count).toEqual(1);
  });

  it("should not be able to increment click count if url not found", async () => {
    await expect(() =>
      incrementClickCountService.execute({
        shortenUrl: "non-existing-url",
      })
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });

  it("should not be able to increment click count if url already deleted", async () => {
    const { url } = await createUrlService.execute({
      expirationDate: new Date(),
      originalUrl: "https://google.com.br",
      userId: "user-01",
    });

    await urlsRepository.deleteById(url.id);

    await expect(() =>
      incrementClickCountService.execute({
        shortenUrl: url.shorten_url,
      })
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
