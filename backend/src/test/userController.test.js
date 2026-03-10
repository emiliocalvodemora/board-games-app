import { describe, it, expect, vi, beforeEach } from "vitest";
import * as userModel from "../models/userModel.js";
import * as userController from "../controllers/userController.js";
import argon2 from "argon2";

vi.mock("../models/userModel.js");
vi.mock("argon2");

describe("User Controller", () => {
  let req;
  let res;
  let next;
  beforeEach(() => {
    req = {
      body: {},
      params: {},
      query: {}
    };

    res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn()
    };

    next = vi.fn();
  });

  it("createUser crea un usuario correctamente", async () => {
    req.body = {
      name: "Carlos",
      email: "carlos@test.com",
      password: "123456",
      role: "player"
    };
    argon2.hash.mockResolvedValue("hashedPassword");
    userModel.createUserService.mockResolvedValue({
      id: 1,
      name: "Carlos"
    });
    await userController.createUser(req, res, next);
    expect(userModel.createUserService).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(201);
  });

  it("getAllUsers devuelve la lista de usuarios", async () => {
    const mockUsers = [{ id: 1, name: "Carlos" }];
    userModel.getAllUsersService.mockResolvedValue(mockUsers);
    await userController.getAllUsers(req, res, next);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalled();
  });

  it("getUserById devuelve usuario si existe", async () => {
    req.params.id = 1;
    const mockUser = { id: 1, name: "Carlos" };
    userModel.getUserByIdService.mockResolvedValue(mockUser);
    await userController.getUserById(req, res, next);
    expect(res.status).toHaveBeenCalledWith(200);
  });

  it("getUserById devuelve 404 si no existe", async () => {
    req.params.id = 1;
    userModel.getUserByIdService.mockResolvedValue(null);
    await userController.getUserById(req, res, next);
    expect(res.status).toHaveBeenCalledWith(404);
  });

  it("updateUser actualiza el usuario", async () => {
    req.params.id = 1;
    req.body = {
      name: "NuevoNombre",
      email: "nuevo@test.com",
      password: "123456"
    };
    argon2.hash.mockResolvedValue("hashedPassword");
    userModel.updateUserService.mockResolvedValue({
      id: 1,
      name: "NuevoNombre"
    });
    await userController.updateUser(req, res, next);
    expect(res.status).toHaveBeenCalledWith(200);
  });

  it("deleteUser elimina el usuario", async () => {
    req.params.id = 1;
    userModel.deleteUserService.mockResolvedValue({
      id: 1
    });
    await userController.deleteUser(req, res, next);
    expect(res.status).toHaveBeenCalledWith(200);
  });
});