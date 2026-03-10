import { describe, it, expect, vi, beforeEach } from "vitest";
import * as AuthController from "../controllers/authController.js";
import * as UserModel from "../models/userModel.js";
import argon2 from "argon2";
import jwt from "jsonwebtoken";

vi.mock("../models/userModel.js", () => ({
  createUserService: vi.fn(),
  getUserByNameService: vi.fn()
}));
vi.mock("argon2");
vi.mock("jsonwebtoken");

const mockResponse = () => {
  const res = {};
  res.status = vi.fn().mockReturnValue(res);
  res.json = vi.fn().mockReturnValue(res);
  res.cookie = vi.fn().mockReturnValue(res);
  res.clearCookie = vi.fn().mockReturnValue(res);
  return res;
};
const mockNext = vi.fn();

beforeEach(() => vi.clearAllMocks());

describe("Auth Controller", () => {
  it("register crea un usuario nuevo", async () => {
    const req = { body: { name: "User1", email: "email@mail.com", password: "123456", role: "player" } };
    const res = mockResponse();
    UserModel.createUserService.mockResolvedValue({ id: 1, name: "User1" });
    argon2.hash.mockResolvedValue("hashedPassword");

    await AuthController.register(req, res, mockNext);
    expect(UserModel.createUserService).toHaveBeenCalledWith("User1","email@mail.com","hashedPassword","player");
    expect(res.status).toHaveBeenCalledWith(201);
  });

  it("login devuelve token si credenciales correctas", async () => {
    const req = { body: { name: "User1", password: "123456" } };
    const res = mockResponse();
    const user = { id: 1, name: "User1", email: "email@mail.com", role: "player", password_hash: "hashedPassword" };
    UserModel.getUserByNameService.mockResolvedValue(user);
    argon2.verify.mockResolvedValue(true);
    jwt.sign.mockReturnValue("token123");

    await AuthController.login(req, res, mockNext);
    expect(res.cookie).toHaveBeenCalledWith("token","token123", expect.any(Object));
    expect(res.status).toHaveBeenCalledWith(200);
  });

  it("login devuelve 404 si usuario no existe", async () => {
    const req = { body: { name: "User1", password: "123456" } };
    const res = mockResponse();
    UserModel.getUserByNameService.mockResolvedValue(null);

    await AuthController.login(req, res, mockNext);
    expect(res.status).toHaveBeenCalledWith(404);
  });

  it("login devuelve 401 si contraseña incorrecta", async () => {
    const req = { body: { name: "User1", password: "123456" } };
    const res = mockResponse();
    const user = { password_hash: "hashedPassword" };
    UserModel.getUserByNameService.mockResolvedValue(user);
    argon2.verify.mockResolvedValue(false);

    await AuthController.login(req, res, mockNext);
    expect(res.status).toHaveBeenCalledWith(401);
  });

  it("me devuelve perfil del usuario", async () => {
    const req = { user: { id: 1, name: "User1" } };
    const res = mockResponse();

    await AuthController.me(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ status: 200, message: "Perfil del usuario", data: req.user }));
  });

  it("logout limpia la cookie", async () => {
    const res = mockResponse();

    await AuthController.logout({}, res);
    expect(res.clearCookie).toHaveBeenCalledWith("token", expect.any(Object));
    expect(res.status).toHaveBeenCalledWith(200);
  });
});