import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { GetUserProfileService } from "./get-user-profile.service";
import { beforeEach, describe, expect, it } from "vitest";
import bcrypt from "bcryptjs";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";

let usersRepository: InMemoryUsersRepository;
let getUserProfile: GetUserProfileService;

describe("Get User Profile Service", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    getUserProfile = new GetUserProfileService(usersRepository);
  });

  it("should be able to get user profile", async () => {
    const user = await usersRepository.create({
      name: "John Doe",
      email: "WzXZ3@example.com",
      password_hash: await bcrypt.hash("123456", 6),
    });

    const { user: profile } = await getUserProfile.execute({
      userId: user.id,
    });

    expect(profile.id).toEqual(expect.any(String));
    expect(profile.name).toEqual("John Doe");
  });

  it("should not be able to get user profile with wrong id", async () => {
    await expect(() =>
      getUserProfile.execute({
        userId: "non-existing-user-id",
      })
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
