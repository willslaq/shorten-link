import { UrlsRepository } from "@/repositories/urls.repository";
import { CreateUrlService } from "./create-url.service";
import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryUrlsRepository } from "@/repositories/in-memory/in-memory-urls-repository";

let urlsRepository: UrlsRepository;
let createUrlService: CreateUrlService;

describe("Create Url Service", () => {
  beforeEach(() => {
    urlsRepository = new InMemoryUrlsRepository();
    createUrlService = new CreateUrlService(urlsRepository);
  });

  it("should be able to create a url", async () => {
    const { url } = await createUrlService.execute({
      expirationDate: new Date(),
      originalUrl: "https://google.com.br",
      userId: "user-01",
    });

    console.log(url);

    expect(url).toEqual(
      expect.objectContaining({
        original_url: "https://google.com.br",
      })
    );
  });
});
