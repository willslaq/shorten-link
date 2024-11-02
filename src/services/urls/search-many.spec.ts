import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryUrlsRepository } from "@/repositories/in-memory/in-memory-urls-repository";
import { SearchManyUrlService } from "./search-many.service";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";

describe("SearchManyUrlService", () => {
  let urlsRepository: InMemoryUrlsRepository;
  let searchManyUrlService: SearchManyUrlService;

  beforeEach(async () => {
    urlsRepository = new InMemoryUrlsRepository();
    searchManyUrlService = new SearchManyUrlService(urlsRepository);
  });

  it("should return URLs for the user when query is provided", async () => {
    await urlsRepository.create({
      original_url: "https://example.com",
      expiration_date: new Date(),
      user_id: "test-user-id",
      shorten_url: "abc123",
    });

    await urlsRepository.create({
      original_url: "https://should-not-show.com",
      expiration_date: new Date(),
      user_id: "test-user-id",
      shorten_url: "cde456",
    });

    const userId = "test-user-id";
    const query = "example";
    const page = 1;

    const { urls } = await searchManyUrlService.execute({
      userId,
      query,
      page,
    });

    if (!urls) {
      throw new ResourceNotFoundError();
    }

    expect(urls.length).toBe(1);
    expect(urls[0].original_url).toBe("https://example.com");
  });

  it("should return all URLs for the user when query is not provided", async () => {
    await urlsRepository.create({
      original_url: "https://example.com",
      expiration_date: new Date(),
      user_id: "test-user-id",
      shorten_url: "abc123",
    });

    await urlsRepository.create({
      original_url: "https://should-not-show.com",
      expiration_date: new Date(),
      user_id: "test-user-id",
      shorten_url: "cde456",
    });

    const userId = "test-user-id";
    const page = 1;

    const { urls } = await searchManyUrlService.execute({
      userId,
      page,
    });

    if (!urls) {
      throw new ResourceNotFoundError();
    }

    expect(urls.length).toBe(2);
  });

  it("should be able to fetch urls with pagination", async () => {
    for (let i = 1; i <= 22; i++) {
      await urlsRepository.create({
        original_url: `https://example.com/${i}`,
        expiration_date: new Date(),
        user_id: "test-user-id",
        shorten_url: `abc${i}`,
      });
    }

    const userId = "test-user-id";

    const { urls } = await searchManyUrlService.execute({
      userId,
      page: 2,
    });

    if (!urls) {
      throw new ResourceNotFoundError();
    }

    expect(urls.length).toBe(2);
    expect(urls).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ original_url: "https://example.com/21" }),
        expect.objectContaining({ original_url: "https://example.com/22" }),
      ])
    );
  });
});
