import { PrismaUrlsRepository } from "@/repositories/prisma/prisma-urls-repository";
import { SearchManyUrlService } from "../urls/search-many.service";

export function makeSearchManyUrlService() {
  return new SearchManyUrlService(new PrismaUrlsRepository());
}
