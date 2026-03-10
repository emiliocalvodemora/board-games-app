import { describe, it, expect, vi, beforeEach } from "vitest";
import * as matchResultModel from "../models/matchResultModel.js";
import * as matchResultController from "../controllers/matchResultController.js";

vi.mock("../models/matchResultModel.js");

describe("MatchResult Controller", () => {
  let req;
  let res;
  let next;
  beforeEach(() => {
    req = {
      body: {},
      params: {}
    };
    res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn()
    };
    next = vi.fn();
  });

  it("createMatchResult crea un resultado correctamente", async () => {
    req.body = {
      matchId: 1,
      playerId: 2,
      score: 10
    };
    matchResultModel.createMatchResultService.mockResolvedValue({
      matchId: 1,
      playerId: 2,
      score: 10
    });
    await matchResultController.createMatchResult(req, res, next);
    expect(matchResultModel.createMatchResultService).toHaveBeenCalledWith(1,2,10);
    expect(res.status).toHaveBeenCalledWith(201);
  });

  it("getAllMatchResults devuelve todos los resultados", async () => {
    const mockResults = [
      { matchId: 1, playerId: 2, score: 10 }
    ];
    matchResultModel.getAllMatchResultsService.mockResolvedValue(mockResults);
    await matchResultController.getAllMatchResults(req, res, next);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalled();
  });

  it("getMatchResultById devuelve resultado si existe", async () => {
    req.params = { matchId: 1, playerId: 2 };
    const mockResult = { matchId: 1, playerId: 2, score: 10 };
    matchResultModel.getMatchResultByIdService.mockResolvedValue(mockResult);
    await matchResultController.getMatchResultById(req, res, next);
    expect(res.status).toHaveBeenCalledWith(200);
  });

  it("getMatchResultById devuelve 404 si no existe", async () => {
    req.params = { matchId: 1, playerId: 2 };
    matchResultModel.getMatchResultByIdService.mockResolvedValue(null);
    await matchResultController.getMatchResultById(req, res, next);
    expect(res.status).toHaveBeenCalledWith(404);
  });

  it("updateMatchResult actualiza resultado", async () => {
    req.body = {
      matchId: 1,
      playerId: 2,
      score: 15
    };
    matchResultModel.updateMatchResultService.mockResolvedValue({
      matchId: 1,
      playerId: 2,
      score: 15
    });
    await matchResultController.updateMatchResult(req, res, next);
    expect(res.status).toHaveBeenCalledWith(200);
  });

  it("deleteMatchResult elimina resultado", async () => {
    req.params = { matchId: 1, playerId: 2 };
    matchResultModel.deleteMatchResultService.mockResolvedValue({
      matchId: 1,
      playerId: 2
    });
    await matchResultController.deleteMatchResult(req, res, next);
    expect(res.status).toHaveBeenCalledWith(200);
  });

  it("getMatchResultsByMatchId devuelve resultados del match", async () => {
    req.params = { matchId: 1 };
    const mockResults = [
      { matchId: 1, playerId: 2, score: 10 }
    ];
    matchResultModel.getMatchResultsByMatchIdService.mockResolvedValue(mockResults);
    await matchResultController.getMatchResultsByMatchId(req, res, next);
    expect(res.status).toHaveBeenCalledWith(200);
  });

  it("getMatchResultsByMatchId devuelve 404 si no hay resultados", async () => {
    req.params = { matchId: 1 };
    matchResultModel.getMatchResultsByMatchIdService.mockResolvedValue([]);
    await matchResultController.getMatchResultsByMatchId(req, res, next);
    expect(res.status).toHaveBeenCalledWith(404);
  });
});