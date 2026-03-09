// // backend/tests/events.test.js
// import request from "supertest";
// import app from "../app.js";

// describe("EVENTS API", () => {

//   test("GET /api/events devuelve array de eventos", async () => {
//     const res = await request(app).get("/api/events");
//     expect(res.statusCode).toBe(200);
//     expect(Array.isArray(res.body.data)).toBe(true);
//   });

//   test("GET /api/events/:id devuelve evento válido", async () => {
//     const res = await request(app).get("/api/events/1");
//     expect(res.statusCode).toBe(200);
//     expect(res.body.data).toHaveProperty("id", 1);
//   });

//   test("GET /api/events/:id con id inválido devuelve 404", async () => {
//     const res = await request(app).get("/api/events/9999");
//     expect(res.statusCode).toBe(404);
//   });
// });