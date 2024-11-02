import { InMemoryUrlsRepository } from "@/repositories/in-memory/in-memory-urls-repository";
import { UrlsRepository } from "@/repositories/urls.repository";
import { beforeEach, describe, expect, it } from "vitest";
import { CreateUrlService } from "./create-url.service";
import { EditUrlService } from "./edit-url.service";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";

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

  it("should not be able to edit a non-existing url", async () => {
    await expect(() =>
      editUrlService.execute({
        id: "non-existing-id",
        originalUrl: "https://nonexistent.com",
      })
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });

  it("should be able to edit multiple fields of a url", async () => {
    const { url } = await createUrlService.execute({
      expirationDate: new Date(),
      originalUrl: "https://uol.com.br",
      userId: "user-01",
    });

    const ONE_DAY_IN_MILLISECONDS = 1000 * 60 * 60 * 24;

    const newExpirationDate = new Date(Date.now() + ONE_DAY_IN_MILLISECONDS);

    const { url: updatedUrl } = await editUrlService.execute({
      id: url.id,
      originalUrl: "https://google.com.br",
      expirationDate: newExpirationDate,
    });

    expect(updatedUrl).toEqual(
      expect.objectContaining({
        original_url: "https://google.com.br",
        expiration_date: newExpirationDate,
      })
    );
  });

  it("should not alter url if no fields are provided", async () => {
    const { url } = await createUrlService.execute({
      expirationDate: new Date(),
      originalUrl: "https://uol.com.br",
      userId: "user-01",
    });

    const { url: updatedUrl } = await editUrlService.execute({
      id: url.id,
    });

    expect(updatedUrl).toEqual(url);
  });
});
