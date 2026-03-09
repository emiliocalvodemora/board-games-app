// // backend/tests/games.test.js
// import request from "supertest";
// import app from "../app.js";

// describe("GAMES API", () => {

//   test("GET /api/games devuelve array de juegos", async () => {
//     const res = await request(app).get("/api/games");
//     expect(res.statusCode).toBe(200);
//     expect(Array.isArray(res.body.data)).toBe(true);
//   });

//   test("GET /api/game/:id devuelve un juego válido", async () => {
//     const res = await request(app).get("/api/game/1");
//     expect(res.statusCode).toBe(200);
//     expect(res.body.data).toHaveProperty("id", 1);
//   });

//   test("GET /api/game/:id con id inválido devuelve 404", async () => {
//     const res = await request(app).get("/api/game/99999");
//     expect(res.statusCode).toBe(404);
//     expect(res.body).toHaveProperty("error");
//   });
// });