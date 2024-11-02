import { PrismaUrlsRepository } from "@/repositories/prisma/prisma-urls-repository";
import { EditUrlService } from "../urls/edit-url.service";

export function makeEditUrlService() {
  return new EditUrlService(new PrismaUrlsRepository());
}
