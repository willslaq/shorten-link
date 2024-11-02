import { Prisma, Url } from "@prisma/client";

export interface UrlsRepository {
  create(data: Prisma.UrlUncheckedCreateInput): Promise<Url>;
  searchMany(userId: string, query: string, page: number): Promise<Url[] | null>;
  findByUserId(userId: string, page: number): Promise<Url[] | null>;
  deleteById(id: string): Promise<void>;
  deleteAllByUserId(userId: string): Promise<void>;
  save(data: Prisma.UrlUncheckedUpdateInput): Promise<Url>;
  incrementVisits(shortenUrl: string): Promise<Url>;
}
