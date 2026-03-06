// backend/tests/auth.test.js
import request from "supertest";
import app from "../app.js";

describe("AUTH API", () => {
  const testUser = { email: "test@test.com", password: "123456" };

  test("POST /api/auth/register crea un usuario", async () => {
    const res = await request(app)
      .post("/api/auth/register")
      .send({ ...testUser, name: "Test User" });

    expect([200,201]).toContain(res.statusCode);
    expect(res.body).toHaveProperty("id");
    expect(res.body).toHaveProperty("email", testUser.email);
  });

  test("POST /api/auth/login con credenciales válidas devuelve token", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send(testUser);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("token");
  });

  test("POST /api/auth/login con credenciales inválidas devuelve 401", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({ email: "wrong@test.com", password: "badpass" });

    expect(res.statusCode).toBe(401);
  });
});