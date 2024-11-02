import { afterAll, beforeAll, describe, expect, it } from "vitest";
import request from "supertest";
import { app } from "@/app";

describe("Delete URL Controller", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should delete the URL and return the deleted URL object", async () => {
    const ONE_DAY_IN_MILLISECONDS = 1000 * 60 * 60 * 24;

    const createResponse = await request(app.server)
      .post("/shorten-url")
      .send({
        originalUrl: "https://example.com",
        expirationDate: new Date(
          Date.now() + ONE_DAY_IN_MILLISECONDS
        ).toISOString(),
      });

    const { id } = createResponse.body.url;

    const deleteResponse = await request(app.server).delete(`/urls/${id}`);

    expect(deleteResponse.statusCode).toEqual(200);
    expect(deleteResponse.body.message).toEqual("URL deleted successfully");
  });
});
