import { describe, it, expect, vi, beforeEach } from "vitest";
import * as matchModel from "../models/matchModel.js";
import * as matchController from "../controllers/matchController.js";

vi.mock("../models/matchModel.js");

describe("Match Controller", () => {
  let req;
  let res;
  let next;
  beforeEach(() => {
    req = {
      body: {},
      params: {},
      user: { id: 1 }
    };
    res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn()
    };
    next = vi.fn();
  });

  it("createMatch crea una partida correctamente", async () => {
    req.body = {
      gameId: 1,
      eventId: 2,
      startTime: "2026-07-01T10:00:00",
      endTime: "2026-07-01T12:00:00"
    };
    matchModel.createMatchService.mockResolvedValue({
      id: 1,
      gameId: 1
    });
    await matchController.createMatch(req, res, next);
    expect(matchModel.createMatchService)
      .toHaveBeenCalledWith(1, 2, req.body.startTime, req.body.endTime);
    expect(res.status).toHaveBeenCalledWith(201);
  });

  it("getAllMatches devuelve todas las partidas", async () => {
    const mockMatches = [
      { id: 1, gameId: 1 }
    ];
    matchModel.getAllMatchsService.mockResolvedValue(mockMatches);
    await matchController.getAllMatches(req, res, next);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalled();
  });

  it("getMatchById devuelve una partida si existe", async () => {
    req.params.id = 1;
    const mockMatch = { id: 1 };
    matchModel.getMatchByIdService.mockResolvedValue(mockMatch);
    await matchController.getMatchById(req, res, next);
    expect(res.status).toHaveBeenCalledWith(200);
  });

  it("getMatchById devuelve 404 si no existe", async () => {
    req.params.id = 1;
    matchModel.getMatchByIdService.mockResolvedValue(null);
    await matchController.getMatchById(req, res, next);
    expect(res.status).toHaveBeenCalledWith(404);
  });

  it("updateMatch actualiza la partida", async () => {
    req.params.id = 1;
    req.body = {
      gameId: 2,
      eventId: 3,
      startTime: "2026-07-01T14:00:00",
      endTime: "2026-07-01T16:00:00"
    };
    matchModel.updateMatchService.mockResolvedValue({
      id: 1,
      gameId: 2
    });
    await matchController.updateMatch(req, res, next);
    expect(res.status).toHaveBeenCalledWith(200);
  });

  it("updateMatch devuelve 404 si no existe la partida", async () => {
    req.params.id = 1;
    matchModel.updateMatchService.mockResolvedValue(null);
    await matchController.updateMatch(req, res, next);
    expect(res.status).toHaveBeenCalledWith(404);
  });

  it("deleteMatch elimina la partida", async () => {
    req.params.id = 1;
    matchModel.deleteMatchService.mockResolvedValue({ id: 1 });
    await matchController.deleteMatch(req, res, next);
    expect(res.status).toHaveBeenCalledWith(200);
  });

  it("getUserMatches devuelve las partidas del usuario", async () => {
    const mockMatches = [
      { id: 1, playerId: 1 }
    ];
    matchModel.getUserMatchesService.mockResolvedValue(mockMatches);
    await matchController.getUserMatches(req, res, next);
    expect(matchModel.getUserMatchesService).toHaveBeenCalledWith(1);
    expect(res.status).toHaveBeenCalledWith(200);
  });

  it("getNotUserMatches devuelve partidas de otros usuarios", async () => {
    const mockMatches = [
      { id: 2, playerId: 2 }
    ];
    matchModel.getNotUserMatchesService.mockResolvedValue(mockMatches);
    await matchController.getNotUserMatches(req, res, next);
    expect(matchModel.getNotUserMatchesService).toHaveBeenCalledWith(1);
    expect(res.status).toHaveBeenCalledWith(200);
  });
});