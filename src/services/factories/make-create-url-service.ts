import { PrismaUrlsRepository } from "@/repositories/prisma/prisma-urls-repository";
import { CreateUrlService } from "../urls/create-url.service";

export function makeCreateUrlService() {
  return new CreateUrlService(new PrismaUrlsRepository());
}
