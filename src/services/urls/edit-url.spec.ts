import { InMemoryUrlsRepository } from "@/repositories/in-memory/in-memory-urls-repository";
import { UrlsRepository } from "@/repositories/urls.repository";
import { beforeEach, describe, expect, it } from "vitest";
import { CreateUrlService } from "./create-url.service";
import { EditUrlService } from "./edit-url.service";

let urlsRepository: UrlsRepository;
let editUrlService: EditUrlService;
let createUrlService: CreateUrlService;

describe("Edit Url Service", () => {
  beforeEach(() => {
    urlsRepository = new InMemoryUrlsRepository();
    editUrlService = new EditUrlService(urlsRepository);
    createUrlService = new CreateUrlService(urlsRepository);
  });

  it("should be able to edit a url", async () => {
    const { url } = await createUrlService.execute({
      expirationDate: new Date(),
      originalUrl: "https://uol.com.br",
      userId: "user-01",
    });

    const { url: updatedUrl } = await editUrlService.execute({
      id: url.id,
      originalUrl: "https://google.com.br",
    });

    expect(updatedUrl).toEqual(
      expect.objectContaining({
        original_url: "https://google.com.br",
      })
    );
  });
});
