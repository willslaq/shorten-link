import { PrismaUrlsRepository } from "@/repositories/prisma/prisma-urls-repository";
import { DeleteUrlService } from "../urls/delete-url.service";

export function makeDeleteUrlService() {
  return new DeleteUrlService(new PrismaUrlsRepository());
}
