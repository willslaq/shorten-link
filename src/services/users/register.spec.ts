import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { RegisterService } from "./register.service";
import { describe, beforeEach, it, expect } from "vitest";

let usersRepository: InMemoryUsersRepository;
let registerService: RegisterService;

describe("Register Service", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    registerService = new RegisterService(usersRepository);
  });

  it("should be able to register", async () => {
    const { user } = await registerService.execute({
      name: "John Doe",
      email: "lQy5d@example.com",
      password: "123456",
    });

    expect(user.id).toEqual(expect.any(String));
  });
});
