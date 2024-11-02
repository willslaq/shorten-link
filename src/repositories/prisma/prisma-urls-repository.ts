import { Prisma } from "@prisma/client";
import { UrlsRepository } from "../urls.repository";
import { prisma } from "@/lib/prisma";

export class PrismaUrlsRepository implements UrlsRepository {
  async create(data: Prisma.UrlUncheckedCreateInput) {
    const url = await prisma.url.create({
      data: {
        original_url: data.original_url,
        shorten_url: data.shorten_url,
        user_id: data.user_id || null,
        expiration_date: data.expiration_date || new Date("9999-01-01"),
        click_count: data.click_count || 0,
      },
    });

    return url;
  }
  async searchMany(userId: string, page: number, query?: string) {
    const urls = await prisma.url.findMany({
      where: {
        user_id: userId,
        original_url: query ? { contains: query } : undefined,
        deleted_at: null,
      },
      skip: (page - 1) * 20,
      take: 20,
    });

    return urls;
  }

  async findByUserId(userId: string, page: number) {
    const urls = await prisma.url.findMany({
      where: {
        user_id: userId,
        deleted_at: null,
      },
      skip: (page - 1) * 20,
      take: 20,
    });

    return urls;
  }
  async findByShortenUrl(shortenUrl: string) {
    const url = await prisma.url.findFirst({
      where: {
        shorten_url: shortenUrl,
        deleted_at: null,
      },
    });

    return url;
  }
  async findById(id: string) {
    const url = await prisma.url.findUnique({
      where: {
        id,
      },
    });

    return url;
  }
  async deleteById(id: string) {
    await prisma.url.update({
      where: {
        id,
      },
      data: {
        deleted_at: new Date(),
      },
    });

    return;
  }
  async deleteAllByUserId(userId: string) {
    await prisma.url.updateMany({
      where: {
        user_id: userId,
      },
      data: {
        deleted_at: new Date(),
      },
    });

    return;
  }
  async save(data: Prisma.UrlUncheckedUpdateInput) {
    const url = await prisma.url.update({
      where: {
        id: data.id as string,
      },
      data: {
        original_url: data.original_url,
        shorten_url: data.shorten_url,
        click_count: data.click_count,
        expiration_date: data.expiration_date || new Date("9999-01-01"),
        updated_at: new Date(),
      },
    });

    return url;
  }
  async incrementVisits(shortenUrl: string) {
    const url = await prisma.url.update({
      where: {
        shorten_url: shortenUrl,
      },
      data: {
        click_count: {
          increment: 1,
        },
        updated_at: new Date(),
      },
    });

    return url;
  }
}
