import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { AuthenticateService } from "../users/authenticate.service";

export function makeAuthenticateService() {
  return new AuthenticateService(new PrismaUsersRepository());
}
