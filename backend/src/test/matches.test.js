// // backend/tests/matches.test.js
// import request from "supertest";
// import app from "../app.js";

// describe("MATCHES API", () => {
//   let token;

//   beforeAll(async () => {
//     // Login para obtener token
//     const res = await request(app)
//       .post("/api/auth/login")
//       .send({ email: "test@test.com", password: "123456" });

//     token = res.body.token;
//   });

//   test("POST /api/match crea una partida", async () => {
//     const res = await request(app)
//       .post("/api/match")
//       .set("Authorization", `Bearer ${token}`)
//       .send({
//         gameId: 1,
//         eventId: null,
//         startTime: "2026-03-05T10:00",
//         endTime: "2026-03-05T11:00",
//         score: 5
//       });

//     expect(res.statusCode).toBe(201);
//     expect(res.body.data).toHaveProperty("id");
//     expect(res.body.data.score).toBe(5);
//   });

//   test("POST /api/match sin token devuelve 401", async () => {
//     const res = await request(app)
//       .post("/api/match")
//       .send({
//         gameId: 1,
//         startTime: "2026-03-05T10:00",
//         endTime: "2026-03-05T11:00",
//         score: 5
//       });

//     expect(res.statusCode).toBe(401);
//   });
// });