import { describe, test, expect, vi } from "vitest";
import { validate } from "../middleware/validateMiddleware.js";

describe("validate middleware", () => {
  test("calls next and replaces req.body when data is valid", () => {
    const schema = {
      safeParse: vi.fn(),
    };

    const parsedData = {
      position: "Frontend Developer",
    };

    schema.safeParse.mockReturnValue({
      success: true,
      data: parsedData,
    });

    const originalBody = {
      position: "  Frontend Developer  ",
    };

    const req = {
      body: originalBody,
    };

    const res = {};

    const next = vi.fn();

    const middleware = validate(schema);

    middleware(req, res, next);

    expect(schema.safeParse).toHaveBeenCalledWith(originalBody);

    expect(next).toHaveBeenCalled();

    expect(req.body).toEqual(parsedData);
  });

  test("invalid data", () => {
    const schema = {
      safeParse: vi.fn(),
    };

    schema.safeParse.mockReturnValue({
      success: false,
      error: {
        issues: [
          {
            message: "Position is required",
          },
        ],
      },
    });

    const json = vi.fn();

    const res = {
      status: vi.fn(() => ({
        json,
      })),
    };

    const req = {
      body: {
        position: "",
      },
    };

    const next = vi.fn();

    const middleware = validate(schema);
    middleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(json).toHaveBeenCalledWith({
      errors: [
        {
          message: "Position is required",
        },
      ],
    });
    expect(next).not.toHaveBeenCalled();
  });
});
