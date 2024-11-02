import { afterAll, beforeAll, describe, expect, it } from "vitest";
import request from "supertest";
import { app } from "@/app";
import { createAndAuthenticateUser } from "@/utils/test/create-and-authenticate-user";
import { prisma } from "@/lib/prisma";

describe("Create Shorten URL Controller", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to create a shorten URL unauthenticated", async () => {
    const response = await request(app.server).post("/shorten-url").send({
      originalUrl: "https://example.com",
      expirationDate: new Date().toISOString(),
    });

    expect(response.statusCode).toEqual(201);
    expect(response.body.url).toEqual(
      expect.objectContaining({
        original_url: "https://example.com",
        shorten_url: expect.any(String),
        expiration_date: expect.any(String),
      })
    );
  });

  it("should be able to create a shorten URL authenticated", async () => {
    const { token } = await createAndAuthenticateUser(app);

    const user = await prisma.user.findFirstOrThrow();

    const response = await request(app.server)
      .post("/shorten-url")
      .set("Authorization", `Bearer ${token}`)
      .send({
        originalUrl: "https://example.com",
        expirationDate: new Date().toISOString(),
      });

    expect(response.statusCode).toEqual(201);
    expect(response.body.url).toEqual(
      expect.objectContaining({
        original_url: "https://example.com",
        shorten_url: expect.any(String),
        expiration_date: expect.any(String),
        user_id: user.id,
      })
    );
  });
});
