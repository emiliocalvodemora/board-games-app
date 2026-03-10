import { describe, it, expect, vi, beforeEach } from "vitest";
import * as gameController from "../controllers/eventParticipationController.js";
import * as eventParticipationModel from "../models/eventParticipationModel.js";

vi.mock("../models/eventParticipationModel.js", () => ({
  createEventParticipationService: vi.fn(),
  deleteEventParticipationService: vi.fn(),
  getAllEventParticipationsService: vi.fn(),
  getEventParticipationByIdService: vi.fn(),
  updateEventParticipationService: vi.fn(),
  getEventParticipationByPlayerIdService: vi.fn()
}));

const mockResponse = () => {
  const res = {};
  res.status = vi.fn().mockReturnValue(res);
  res.json = vi.fn().mockReturnValue(res);
  return res;
};

const mockNext = vi.fn();

beforeEach(() => {
  vi.clearAllMocks();
});

describe("EventParticipation Controller", () => {

  it("createEventParticipation debería crear una participación", async () => {
    const req = {
      body: { eventId: 1, playerId: 2, ranking: 1 }
    };
    const res = mockResponse();
    const participation = { eventId: 1, playerId: 2, ranking: 1 };
    eventParticipationModel.createEventParticipationService.mockResolvedValue(participation);
    await gameController.createEventParticipation(req, res, mockNext);
    expect(eventParticipationModel.createEventParticipationService).toHaveBeenCalledWith(1, 2, 1);
    expect(res.status).toHaveBeenCalledWith(201);
  });

  it("getAllEventParticipations debería devolver todas", async () => {
    const req = {};
    const res = mockResponse();
    const participations = [{ eventId: 1, playerId: 2 }];
    eventParticipationModel.getAllEventParticipationsService.mockResolvedValue(participations);
    await gameController.getAllEventParticipations(req, res, mockNext);
    expect(eventParticipationModel.getAllEventParticipationsService).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
  });

  it("getEventParticipationByPlayerId debería devolver participaciones", async () => {
    const req = { params: { playerId: 2 } };
    const res = mockResponse();
    const participations = [{ eventId: 1, playerId: 2 }];
    eventParticipationModel.getEventParticipationByPlayerIdService.mockResolvedValue(participations);
    await gameController.getEventParticipationByPlayerId(req, res, mockNext);
    expect(eventParticipationModel.getEventParticipationByPlayerIdService).toHaveBeenCalledWith(2);
    expect(res.status).toHaveBeenCalledWith(200);
  });

  it("getEventParticipationById debería devolver una participación", async () => {
    const req = { params: { eventId: 1, playerId: 2 } };
    const res = mockResponse();
    const participation = { eventId: 1, playerId: 2 };
    eventParticipationModel.getEventParticipationByIdService.mockResolvedValue(participation);
    await gameController.getEventParticipationById(req, res, mockNext);
    expect(eventParticipationModel.getEventParticipationByIdService).toHaveBeenCalledWith(1, 2);
    expect(res.status).toHaveBeenCalledWith(200);
  });

  it("getEventParticipationById debería devolver 404 si no existe", async () => {
    const req = { params: { eventId: 1, playerId: 2 } };
    const res = mockResponse();
    eventParticipationModel.getEventParticipationByIdService.mockResolvedValue(null);
    await gameController.getEventParticipationById(req, res, mockNext);
    expect(res.status).toHaveBeenCalledWith(404);
  });

  it("updateEventParticipation debería actualizar una participación", async () => {
    const req = {
      body: { eventId: 1, playerId: 2, ranking: 2 }
    };
    const res = mockResponse();
    const updated = { eventId: 1, playerId: 2, ranking: 2 };
    eventParticipationModel.updateEventParticipationService.mockResolvedValue(updated);
    await gameController.updateEventParticipation(req, res, mockNext);
    expect(eventParticipationModel.updateEventParticipationService).toHaveBeenCalledWith(1, 2, 2);
    expect(res.status).toHaveBeenCalledWith(200);
  });

  it("updateEventParticipation debería devolver 404 si no existe", async () => {
    const req = {
      body: { eventId: 1, playerId: 2, ranking: 2 }
    };
    const res = mockResponse();
    eventParticipationModel.updateEventParticipationService.mockResolvedValue(null);
    await gameController.updateEventParticipation(req, res, mockNext);
    expect(res.status).toHaveBeenCalledWith(404);
  });

  it("deleteEventParticipation debería borrar una participación", async () => {
    const req = { params: { eventId: 1, playerId: 2 } };
    const res = mockResponse();
    const deleted = { eventId: 1, playerId: 2 };
    eventParticipationModel.deleteEventParticipationService.mockResolvedValue(deleted);
    await gameController.deleteEventParticipation(req, res, mockNext);
    expect(eventParticipationModel.deleteEventParticipationService).toHaveBeenCalledWith(1, 2);
    expect(res.status).toHaveBeenCalledWith(200);
  });

  it("deleteEventParticipation debería devolver 404 si no existe", async () => {
    const req = { params: { eventId: 1, playerId: 2 } };
    const res = mockResponse();
    eventParticipationModel.deleteEventParticipationService.mockResolvedValue(null);
    await gameController.deleteEventParticipation(req, res, mockNext);
    expect(res.status).toHaveBeenCalledWith(404);
  });
});