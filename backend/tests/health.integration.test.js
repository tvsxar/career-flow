import { describe, test, expect } from "vitest";
import request from "supertest";
import app from "../app.js";

describe("Health Check API", () => {
  test("GET /api/health should return status 200 and status ok", async () => {
    const response = await request(app).get("/api/health");

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      status: "ok",
    });
  });
});
