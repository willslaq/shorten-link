import { afterAll, beforeAll, describe, expect, it } from "vitest";
import request from "supertest";
import { app } from "@/app";
import { createAndAuthenticateUser } from "@/utils/test/create-and-authenticate-user";
import { prisma } from "@/lib/prisma";

describe("Search User URLs Controller", () => {
  let token: string;

  beforeAll(async () => {
    await app.ready();
    const ONE_DAY_IN_MILLISECONDS = 1000 * 60 * 60 * 24;

    ({ token } = await createAndAuthenticateUser(app));

    const user = await prisma.user.findFirstOrThrow();

    await prisma.url.createMany({
      data: [
        {
          original_url: "https://example.com",
          shorten_url: "abc123",
          user_id: user.id,
          expiration_date: new Date(Date.now() + ONE_DAY_IN_MILLISECONDS),
          created_at: new Date(),
        },
        {
          original_url: "https://test.com",
          shorten_url: "def456",
          user_id: user.id,
          expiration_date: new Date(Date.now() + ONE_DAY_IN_MILLISECONDS),
          created_at: new Date(),
        },
      ],
    });
  });

  afterAll(async () => {
    await app.close();
  });

  it("should return all URLs for the authenticated user", async () => {
    const response = await request(app.server)
      .get("/user/urls")
      .set("Authorization", `Bearer ${token}`)
      .query({ page: 1 });

    expect(response.statusCode).toEqual(200);
    expect(response.body.urls).toHaveLength(2);
    expect(response.body.urls).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ original_url: "https://example.com" }),
        expect.objectContaining({ original_url: "https://test.com" }),
      ])
    );
  });

  it("should filter URLs based on the query", async () => {
    const response = await request(app.server)
      .get("/user/urls")
      .set("Authorization", `Bearer ${token}`)
      .query({ query: "example", page: 1 });

    expect(response.statusCode).toEqual(200);
    expect(response.body.urls).toHaveLength(1);
    expect(response.body.urls[0].original_url).toBe("https://example.com");
  });

  it("should return 404 if no URLs found for the user", async () => {
    const response = await request(app.server)
      .get("/user/urls")
      .set("Authorization", `Bearer ${token}`)
      .query({ query: "nonexistent", page: 1 });

    expect(response.statusCode).toEqual(404);
    expect(response.body.message).toBe("No URLs found for this user");
  });
});
