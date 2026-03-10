import { describe, it, expect, vi, beforeEach } from "vitest";

import * as gameController from "../controllers/gameController.js";

import * as gameControllerService from "../models/gameModel.js";

vi.mock("../models/gameModel.js", () => ({
  createGameService: vi.fn(),
  deleteGameService: vi.fn(),
  getAllGamesService: vi.fn(),
  getGameByIdService: vi.fn(),
  updateGameService: vi.fn()
}));

const mockResponse = () => {
  const res = {};
  res.status = vi.fn().mockReturnValue(res);
  res.json = vi.fn().mockReturnValue(res);
  return res;
};

const mockNext = vi.fn();

describe("Game controller", () => {

  it("createGame debería crear un juego", async () => {
    const req = {
      body: {
        name: "Catan",
        description: "Juego de estrategia",
        minPlayers: 3,
        maxPlayers: 4
      }
    };
    const res = mockResponse();
    const newGame = {
      id: 1,
      name: "Catan"
    };
    gameControllerService.createGameService.mockResolvedValue(newGame);
    await gameController.createGame(req, res, mockNext);
    expect(gameControllerService.createGameService).toHaveBeenCalledWith(
      "Catan",
      "Juego de estrategia",
      3,
      4
    );
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalled();
  });

  it("getAllGames debería devolver todos los juegos", async () => {
    const req = {};
    const res = mockResponse();
    const games = [
      { id: 1, name: "Catan" },
      { id: 2, name: "Carcassonne" }
    ];
    gameControllerService.getAllGamesService.mockResolvedValue(games);
    await gameController.getAllGames(req, res, mockNext);
    expect(gameControllerService.getAllGamesService).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
  });

  it("getGameById debería devolver un juego", async () => {
    const req = { params: { id: 1 } };
    const res = mockResponse();
    const game = { id: 1, name: "Catan" };
    gameControllerService.getGameByIdService.mockResolvedValue(game);
    await gameController.getGameById(req, res, mockNext);
    expect(gameControllerService.getGameByIdService).toHaveBeenCalledWith(1);
    expect(res.status).toHaveBeenCalledWith(200);
  });

  it("getGameById debería devolver 404 si no existe", async () => {
    const req = { params: { id: 99 } };
    const res = mockResponse();
    gameControllerService.getGameByIdService.mockResolvedValue(null);
    await gameController.getGameById(req, res, mockNext);
    expect(res.status).toHaveBeenCalledWith(404);
  });


  it("updateGame debería actualizar un juego", async () => {
    const req = {
      params: { id: 1 },
      body: {
        name: "Catan Updated",
        description: "Nuevo",
        minPlayers: 3,
        maxPlayers: 5
      }
    };
    const res = mockResponse();
    const updatedGame = { id: 1, name: "Catan Updated" };
    gameControllerService.updateGameService.mockResolvedValue(updatedGame);
    await gameController.updateGame(req, res, mockNext);
    expect(gameControllerService.updateGameService).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
  });


  it("deleteGame debería borrar un juego", async () => {
    const req = { params: { id: 1 } };
    const res = mockResponse();
    const deletedGame = { id: 1 };
    gameControllerService.deleteGameService.mockResolvedValue(deletedGame);
    await gameController.deleteGame(req, res, mockNext);
    expect(gameControllerService.deleteGameService).toHaveBeenCalledWith(1);
    expect(res.status).toHaveBeenCalledWith(200);
  });

});
