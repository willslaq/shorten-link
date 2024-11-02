import { afterAll, beforeAll, describe, expect, it } from "vitest";
import request from "supertest";
import { app } from "@/app";
import { prisma } from "@/lib/prisma";

describe("Redirect to Original URL Controller", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should redirect to the original URL and increment click count", async () => {
    const ONE_DAY_IN_MILLISECONDS = 1000 * 60 * 60 * 24;

    const createResponse = await request(app.server)
      .post("/shorten-url")
      .send({
        originalUrl: "https://example.com",
        expirationDate: new Date(
          Date.now() + ONE_DAY_IN_MILLISECONDS
        ).toISOString(),
      });

    const { shorten_url } = createResponse.body.url;

    const response = await request(app.server).get(`/${shorten_url}`);

    expect(response.statusCode).toEqual(302);
    expect(response.headers.location).toEqual("https://example.com");

    const url = await prisma.url.findUnique({
      where: { shorten_url },
    });

    expect(url?.click_count).toEqual(1);
  });
});
