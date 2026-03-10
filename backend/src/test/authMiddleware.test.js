import { describe, it, expect, vi, beforeEach } from "vitest";
import * as AuthMiddleware from "../middlewares/authMiddleware.js";
import jwt from "jsonwebtoken";

vi.mock("jsonwebtoken");

const mockResponse = () => {
  const res = {};
  res.status = vi.fn().mockReturnValue(res);
  res.json = vi.fn().mockReturnValue(res);
  return res;
};
const mockNext = vi.fn();

beforeEach(() => vi.clearAllMocks());

describe("Auth middleware", () => {
  it("debería devolver 401 si no hay token", () => {
    const req = { cookies: {} };
    const res = mockResponse();

    AuthMiddleware.verifyToken(req, res, mockNext);
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: "No tiene autorización" });
  });

  it("debería devolver 403 si el token es inválido", () => {
    const req = { cookies: { token: "invalidToken" } };
    const res = mockResponse();
    jwt.verify.mockImplementation((token, secret, callback) => callback(new Error("fail"), null));

    AuthMiddleware.verifyToken(req, res, mockNext);
    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({ message: "Autorización inválida" });
  });

  it("debería llamar a next() si el token es válido", () => {
    const req = { cookies: { token: "validToken" } };
    const res = mockResponse();
    const user = { id: 1, name: "User1" };
    jwt.verify.mockImplementation((token, secret, callback) => callback(null, user));

    AuthMiddleware.verifyToken(req, res, mockNext);
    expect(req.user).toEqual(user);
    expect(mockNext).toHaveBeenCalled();
  });

  it("debería devolver 500 si ocurre un error en try/catch", () => {
    const req = { cookies: { token: "token" } };
    const res = mockResponse();
    jwt.verify.mockImplementation(() => { throw new Error("server error"); });

    AuthMiddleware.verifyToken(req, res, mockNext);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: "Error en el servidor" });
  });
});