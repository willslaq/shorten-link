import { afterAll, beforeAll, describe, expect, it } from "vitest";
import request from "supertest";
import { app } from "@/app";

describe("Edit URL Controller", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should edit the URL and return the updated URL object", async () => {
    const ONE_DAY_IN_MILLISECONDS = 1000 * 60 * 60 * 24;
    const TWO_DAYS_IN_MILLISECONDS = 1000 * 60 * 60 * 48;

    const createResponse = await request(app.server)
      .post("/shorten-url")
      .send({
        originalUrl: "https://example.com",
        expirationDate: new Date(
          Date.now() + ONE_DAY_IN_MILLISECONDS
        ).toISOString(),
      });

    const { id } = createResponse.body.url;

    const newOriginalUrl = "https://newexample.com";
    const newExpirationDate = new Date(
      Date.now() + TWO_DAYS_IN_MILLISECONDS
    ).toISOString();

    const editResponse = await request(app.server).put(`/urls/${id}`).send({
      originalUrl: newOriginalUrl,
      expirationDate: newExpirationDate,
    });

    expect(editResponse.statusCode).toEqual(200);

    const updatedUrl = editResponse.body.url;

    expect(updatedUrl).toEqual(
      expect.objectContaining({
        original_url: newOriginalUrl,
        shorten_url: expect.any(String),
        expiration_date: newExpirationDate,
      })
    );
  });
});
