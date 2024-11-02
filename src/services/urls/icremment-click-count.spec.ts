import { UrlsRepository } from "@/repositories/urls.repository";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { CreateUrlService } from "./create-url.service";
import { InMemoryUrlsRepository } from "@/repositories/in-memory/in-memory-urls-repository";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";
import { IncremmentClickCountService } from "./icremment-click-count.service";
import { UrlExpiredError } from "../errors/url-expired-error";

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

    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
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

  it("should not be able to increment click count if url already expired", async () => {
    vi.setSystemTime(new Date(2022, 0, 1, 12, 40));
    const { url } = await createUrlService.execute({
      expirationDate: new Date(2022, 0, 2, 12, 40),
      originalUrl: "https://google.com.br",
      userId: "user-01",
    });

    const TWO_DAYS_IN_MILLISECONDS = 1000 * 60 * 60 * 24 * 2;

    vi.advanceTimersByTime(TWO_DAYS_IN_MILLISECONDS);

    await expect(() =>
      incrementClickCountService.execute({
        shortenUrl: url.shorten_url,
      })
    ).rejects.toBeInstanceOf(UrlExpiredError);
  });
});
