import { describe, it, expect, vi, beforeEach } from "vitest";
import { authorizeRoles } from "../middlewares/roleMiddleware.js";

const mockResponse = () => {
  const res = {};
  res.status = vi.fn().mockReturnValue(res);
  res.json = vi.fn().mockReturnValue(res);
  return res;
};
const mockNext = vi.fn();

beforeEach(() => vi.clearAllMocks());

describe("roleMiddleware middleware", () => {
  it("permite acceso si el rol está permitido", () => {
    const req = { user: { role: "admin" } };
    const res = mockResponse();
    const middleware = authorizeRoles(["admin", "player"]);
    middleware(req, res, mockNext);
    expect(mockNext).toHaveBeenCalled();
  });

  it("bloquea acceso si el rol no está permitido", () => {
    const req = { user: { role: "player" } };
    const res = mockResponse();
    const middleware = authorizeRoles(["admin"]);
    middleware(req, res, mockNext);
    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({ message: "No tiene permiso para acceder a esta ruta" });
    expect(mockNext).not.toHaveBeenCalled();
  });
});