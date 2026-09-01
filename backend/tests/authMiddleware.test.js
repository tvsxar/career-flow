import { describe, test, expect, vi, beforeEach } from "vitest";
import { protect } from "../middleware/authMiddleware.js";
import { auth } from "../lib/auth.js";
import { fromNodeHeaders } from "better-auth/node";

vi.mock("../lib/auth.js", () => ({
  auth: {
    api: {
      getSession: vi.fn(),
    },
  },
}));

vi.mock("better-auth/node", () => ({
  fromNodeHeaders: vi.fn(),
}));

beforeEach(() => {
  vi.clearAllMocks();
});

describe("protect middleware", () => {
  test("should write session and user to req when session exists", async () => {
    const session = {
      user: {
        id: "user123",
        email: "test@example.com",
      },
      session: {
        id: "session123",
      },
    };

    const req = {
      headers: {
        cookie: "fake-cookie",
      },
    };

    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    };

    const next = vi.fn();

    const convertedHeaders = new Headers();

    fromNodeHeaders.mockReturnValue(convertedHeaders);
    auth.api.getSession.mockResolvedValue(session);

    await protect(req, res, next);

    expect(fromNodeHeaders).toHaveBeenCalledWith(req.headers);
    expect(auth.api.getSession).toHaveBeenCalledWith({
      headers: convertedHeaders,
    });
    expect(req.user).toEqual(session.user);
    expect(req.session).toEqual(session.session);
    expect(next).toHaveBeenCalled();
  });

  test("should return 401 when session does not exist", async () => {
    const req = {
      headers: {
        cookie: "fake-cookie",
      },
    };

    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    };

    const next = vi.fn();

    const convertedHeaders = new Headers();

    fromNodeHeaders.mockReturnValue(convertedHeaders);
    auth.api.getSession.mockResolvedValue(null);

    await protect(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({
      message: "Unauthorized",
    });
    expect(next).not.toHaveBeenCalled();
  });

  test("should call next with error when an exception occurs", async () => {
    const req = {
      headers: {
        cookie: "fake-cookie",
      },
    };

    const res = {};

    const next = vi.fn();

    const convertedHeaders = new Headers();

    const error = new Error("Some error");

    fromNodeHeaders.mockReturnValue(convertedHeaders);
    auth.api.getSession.mockRejectedValue(error);

    await protect(req, res, next);

    expect(next).toHaveBeenCalledWith(error);
  });
});
