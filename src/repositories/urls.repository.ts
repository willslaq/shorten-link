import { Prisma, Url } from "@prisma/client";

export interface UrlsRepository {
  create(data: Prisma.UrlUncheckedCreateInput): Promise<Url>;
  save(data: Prisma.UrlUncheckedUpdateInput): Promise<Url>;
  searchMany(
    userId: string,
    page: number,
    query?: string
  ): Promise<Url[] | null>;
  findByUserId(userId: string, page: number): Promise<Url[] | null>;
  findByShortenUrl(shortenUrl: string): Promise<Url | null>;
  findById(id: string): Promise<Url | null>;
  incrementVisits(shortenUrl: string): Promise<Url>;
  deleteById(id: string): Promise<void>;
  deleteAllByUserId(userId: string): Promise<void>;
}
