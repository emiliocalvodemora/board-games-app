import { describe, it, expect, vi, beforeEach } from "vitest";
import * as validators from "../middlewares/inputValidator.js";

const mockResponse = () => {
  const res = {};
  res.status = vi.fn().mockReturnValue(res);
  res.json = vi.fn().mockReturnValue(res);
  return res;
};
const mockNext = vi.fn();

beforeEach(() => vi.clearAllMocks());

describe("InputValidator middleware", () => {

  const testValidMiddleware = async (middleware, validBody) => {
    const req = { body: validBody };
    const res = mockResponse();
    await middleware(req, res, mockNext);
    expect(mockNext).toHaveBeenCalled();
  };

  const testInvalidMiddleware = async (middleware, invalidBody) => {
    const req = { body: invalidBody };
    const res = mockResponse();
    await middleware(req, res, mockNext);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ status: 400, message: expect.any(String) })
    );
  };

  it("validateAdmin pasa con datos válidos y falla con inválidos", async () => {
    await testValidMiddleware(validators.validateAdmin, { name: "Admin1", email: "a@b.com", password: "123456" });
    await testInvalidMiddleware(validators.validateAdmin, { name: "Ad", email: "invalid", password: "123" });
  });

  it("validatePlayer pasa con datos válidos y falla con inválidos", async () => {
    await testValidMiddleware(validators.validatePlayer, { name: "Player1", email: "p@b.com", password: "123456" });
    await testInvalidMiddleware(validators.validatePlayer, { name: "Pl", email: "p@", password: "123" });
  });

  it("validateUserRegister pasa con datos válidos y falla con inválidos", async () => {
    await testValidMiddleware(validators.validateUserRegister, { name: "User1", email: "u@b.com", password: "123456", role: "player" });
    await testInvalidMiddleware(validators.validateUserRegister, { name: "U", email: "u@", password: "123", role: "other" });
  });

  it("validateUserLogin pasa con datos válidos y falla con inválidos", async () => {
    await testValidMiddleware(validators.validateUserLogin, { name: "User1", password: "123456" });
    await testInvalidMiddleware(validators.validateUserLogin, { name: "U", password: "123" });
  });

  it("validateUserUpdate pasa con datos válidos y falla con inválidos", async () => {
    await testValidMiddleware(validators.validateUserUpdate, { name: "User1", email: "u@b.com", password: "123456" });
    await testInvalidMiddleware(validators.validateUserUpdate, { name: "U", email: "u@", password: "123" });
  });

  it("validateEvent pasa con datos válidos y falla con inválidos", async () => {
    await testValidMiddleware(validators.validateEvent, { title: "Evento", description: "Descripcion", event_date: "2026-03-10", event_location: "Córdoba", organizer_admin_id: 1 });
    await testInvalidMiddleware(validators.validateEvent, { title: "E", description: "", event_date: "invalid", event_location: "", organizer_admin_id: "a" });
  });

  it("validateGame pasa con datos válidos y falla con inválidos", async () => {
    await testValidMiddleware(validators.validateGame, { name: "Catan", description: "Juego", minPlayers: 2, maxPlayers: 4 });
    await testInvalidMiddleware(validators.validateGame, { name: "Ca", description: "", minPlayers: "a", maxPlayers: -1 });
  });

  it("validateMatch pasa con datos válidos y falla con inválidos", async () => {
    await testValidMiddleware(validators.validateMatch, { gameId: 1, eventId: null, startTime: "2026-03-10T10:00", endTime: "2026-03-10T12:00" });
    await testInvalidMiddleware(validators.validateMatch, { gameId: "a", eventId: "b", startTime: "invalid", endTime: "invalid" });
  });

});