import { Prisma, Url } from "@prisma/client";
import { UrlsRepository } from "../urls.repository";
import { randomUUID } from "crypto";
import { ResourceNotFoundError } from "@/services/errors/resource-not-found-error";

export class InMemoryUrlsRepository implements UrlsRepository {
  public items: Url[] = [];

  async create(data: Prisma.UrlUncheckedCreateInput) {
    const url = {
      id: randomUUID(),
      original_url: data.original_url,
      shorten_url: data.shorten_url,
      click_count: data.click_count || 0,
      expiration_date: data.expiration_date
        ? new Date(data.expiration_date)
        : new Date("9999-01-01"),
      user_id: data.user_id || null,
      created_at: new Date(),
      updated_at: new Date(),
      deleted_at: null,
    };

    this.items.push(url);

    return url;
  }

  async searchMany(userId: string, page: number, query?: string) {
    return this.items
      .filter(
        (item) =>
          item.user_id === userId &&
          item.deleted_at === null &&
          (query ? item.original_url.includes(query) : true)
      )
      .slice((page - 1) * 20, page * 20);
  }

  async findByUserId(userId: string, page: number) {
    return this.items
      .filter((item) => item.user_id === userId && item.deleted_at === null)
      .slice((page - 1) * 20, page * 20);
  }

  async findByShortenUrl(shortenUrl: string) {
    const url = this.items.find(
      (item) => item.shorten_url === shortenUrl && item.deleted_at === null
    );

    return url || null;
  }

  async findById(id: string) {
    const url = this.items.find(
      (item) => item.id === id && item.deleted_at === null
    );

    return url || null;
  }

  async deleteById(id: string): Promise<void> {
    const url = this.items.find((item) => item.id === id);

    if (url) {
      url.deleted_at = new Date();
    }
  }

  async deleteAllByUserId(userId: string): Promise<void> {
    this.items.forEach((url) => {
      if (url.user_id === userId && url.deleted_at === null) {
        url.deleted_at = new Date();
      }
    });
  }

  async save(data: Prisma.UrlUncheckedUpdateInput): Promise<Url> {
    const index = this.items.findIndex((item) => item.id === data.id);

    if (index === -1) {
      throw new ResourceNotFoundError();
    }

    const existingUrl = this.items[index];

    const updatedUrl: Url = {
      id: existingUrl.id,
      original_url: (data.original_url as string) || existingUrl.original_url,
      shorten_url: (data.shorten_url as string) || existingUrl.shorten_url,
      click_count: (data.click_count as number) || existingUrl.click_count,
      expiration_date:
        (data.expiration_date as Date) || existingUrl.expiration_date,
      updated_at: new Date(),
      created_at: existingUrl.created_at,
      deleted_at: existingUrl.deleted_at,
      user_id: existingUrl.user_id,
    };

    this.items[index] = updatedUrl;

    return updatedUrl;
  }

  async incrementVisits(shortenUrl: string): Promise<Url> {
    const index = this.items.findIndex(
      (item) => item.shorten_url === shortenUrl && item.deleted_at === null
    );

    if (index === -1) {
      throw new ResourceNotFoundError();
    }

    const url = this.items[index];
    url.click_count += 1;
    url.updated_at = new Date();

    this.items[index] = url;

    return url;
  }
}
