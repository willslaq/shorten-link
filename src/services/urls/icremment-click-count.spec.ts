import { UrlsRepository } from "@/repositories/urls.repository";
import { beforeEach, describe, expect, it } from "vitest";
import { CreateUrlService } from "./create-url.service";
import { InMemoryUrlsRepository } from "@/repositories/in-memory/in-memory-urls-repository";

let urlsRepository: UrlsRepository;
let createUrlService: CreateUrlService;

describe("Increment Click Count Service", () => {
  beforeEach(() => {
    urlsRepository = new InMemoryUrlsRepository();
    createUrlService = new CreateUrlService(urlsRepository);
  });

  it("should be able to increment click count", async () => {
    const { url } = await createUrlService.execute({
      expirationDate: new Date(),
      originalUrl: "https://google.com.br",
      userId: "user-01",
    });

    const updatedUrl = await urlsRepository.incrementVisits(url.shorten_url);

    expect(updatedUrl.click_count).toEqual(1);
  });
});
