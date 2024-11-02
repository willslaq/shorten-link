import { PrismaUrlsRepository } from "@/repositories/prisma/prisma-urls-repository";
import { FindOriginalUrlService } from "../urls/find-original-url.service";

export function makeFindOriginalUrlService() {
  return new FindOriginalUrlService(new PrismaUrlsRepository());
}
