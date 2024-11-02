import { PrismaUrlsRepository } from "@/repositories/prisma/prisma-urls-repository";
import { IncremmentClickCountService } from "../urls/icremment-click-count.service";

export function makeIncrementClickCountService() {
  return new IncremmentClickCountService(new PrismaUrlsRepository());
}
