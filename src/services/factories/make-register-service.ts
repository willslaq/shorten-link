import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { RegisterService } from "../users/register.service";

export function makeRegisterService() {
  return new RegisterService(new PrismaUsersRepository());
}
