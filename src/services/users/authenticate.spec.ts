import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { AuthenticateService } from "./authenticate.service";
import bcrypt from "bcryptjs";
import { InvalidCredentialsError } from "../errors/invalid-credentials-error";

let usersRepository: InMemoryUsersRepository;
let authenticateService: AuthenticateService;

describe("Authenticate service", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    authenticateService = new AuthenticateService(usersRepository);
  });

  it("should be able to authenticate", async () => {
    await usersRepository.create({
      name: "John Doe",
      email: "johndoe@gmail.com",
      password_hash: await bcrypt.hash("123456", 6),
    });

    const { user } = await authenticateService.execute({
      email: "johndoe@gmail.com",
      password: "123456",
    });

    expect(user.id).toEqual(expect.any(String));
  });

  it("should not be able to authenticate with wrong email", async () => {
    await expect(() =>
      authenticateService.execute({
        email: "johndoe@gmail.com",
        password: "123456",
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });

  it("should not be able to authenticate with wrong password", async () => {
    await usersRepository.create({
      name: "John Doe",
      email: "johndoe@gmail.com",
      password_hash: await bcrypt.hash("123456", 6),
    });

    await expect(() =>
      authenticateService.execute({
        email: "johndoe@gmail.com",
        password: "123123",
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });
});
