import { describe, it, expect, vi, beforeEach } from "vitest";
import * as EventController from "../controllers/eventController.js";
import * as EventModel from "../models/eventModel.js";

vi.mock("../models/eventModel.js", () => ({
  createEventService: vi.fn(),
  deleteEventService: vi.fn(),
  getAllEventsService: vi.fn(),
  getEventByIdService: vi.fn(),
  updateEventService: vi.fn(),
  getEventByAdminIdService: vi.fn(),
  getUserEventsService: vi.fn(),
  getNotUserEventsService: vi.fn()
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

describe("Event Controller", () => {
  it("createEvent debería crear un evento", async () => {
    const req = {
      body: {
        title: "Torneo Catan",
        description: "Competición",
        event_date: "2026-05-01",
        event_location: "Córdoba",
        organizer_admin_id: 1
      }
    };

    const res = mockResponse();
    const event = { id: 1, title: "Torneo Catan" };
    EventModel.createEventService.mockResolvedValue(event);
    await EventController.createEvent(req, res, mockNext);
    expect(EventModel.createEventService).toHaveBeenCalledWith(
      "Torneo Catan",
      "Competición",
      "2026-05-01",
      "Córdoba",
      1
    );
    expect(res.status).toHaveBeenCalledWith(201);
  });

  it("getAllEvents debería devolver eventos", async () => {
    const req = {};
    const res = mockResponse();
    const events = [{ id: 1, title: "Evento 1" }];
    EventModel.getAllEventsService.mockResolvedValue(events);
    await EventController.getAllEvents(req, res, mockNext);
    expect(EventModel.getAllEventsService).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
  });

  it("getEventById debería devolver un evento", async () => {
    const req = { params: { id: 1 } };
    const res = mockResponse();
    const event = { id: 1 };
    EventModel.getEventByIdService.mockResolvedValue(event);
    await EventController.getEventById(req, res, mockNext);
    expect(EventModel.getEventByIdService).toHaveBeenCalledWith(1);
    expect(res.status).toHaveBeenCalledWith(200);
  });

  it("getEventById debería devolver 404 si no existe", async () => {
    const req = { params: { id: 1 } };
    const res = mockResponse();
    EventModel.getEventByIdService.mockResolvedValue(null);
    await EventController.getEventById(req, res, mockNext);
    expect(res.status).toHaveBeenCalledWith(404);
  });

  it("updateEvent debería actualizar evento", async () => {
    const req = {
      params: { id: 1 },
      body: {
        title: "Evento actualizado",
        description: "Nueva descripción",
        event_date: "2026-06-01",
        event_location: "Córdoba",
        organizer_admin_id: 1
      }
    };
    const res = mockResponse();
    const updated = { id: 1 };
    EventModel.updateEventService.mockResolvedValue(updated);
    await EventController.updateEvent(req, res, mockNext);
    expect(EventModel.updateEventService).toHaveBeenCalledWith(
      1,
      "Evento actualizado",
      "Nueva descripción",
      "2026-06-01",
      "Córdoba",
      1
    );
    expect(res.status).toHaveBeenCalledWith(200);
  });

  it("deleteEvent debería borrar evento", async () => {
    const req = { params: { id: 1 } };
    const res = mockResponse();
    const deleted = { id: 1 };
    EventModel.deleteEventService.mockResolvedValue(deleted);
    await EventController.deleteEvent(req, res, mockNext);
    expect(EventModel.deleteEventService).toHaveBeenCalledWith(1);
    expect(res.status).toHaveBeenCalledWith(200);
  });

  it("getUserEvents debería devolver eventos del usuario", async () => {
    const req = { user: { id: 2 } };
    const res = mockResponse();
    const events = [{ id: 1 }];
    EventModel.getUserEventsService.mockResolvedValue(events);
    await EventController.getUserEvents(req, res, mockNext);
    expect(EventModel.getUserEventsService).toHaveBeenCalledWith(2);
    expect(res.status).toHaveBeenCalledWith(200);
  });

  it("getNotUserEvents debería devolver eventos donde no participa", async () => {
    const req = { user: { id: 2 } };
    const res = mockResponse();
    const events = [{ id: 3 }];
    EventModel.getNotUserEventsService.mockResolvedValue(events);
    await EventController.getNotUserEvents(req, res, mockNext);
    expect(EventModel.getNotUserEventsService).toHaveBeenCalledWith(2);
    expect(res.status).toHaveBeenCalledWith(200);
  });

});