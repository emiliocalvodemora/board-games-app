const pool = require("../config");
const supertest = require("supertest");
const app = require("../index");
const api = supertest(app);
require("dotenv").config();

describe("GET /api/admin/", () => {
    it("should return all products", async () => {
        return request(app)
            .get("/api/admin/")
            .expect('Content-Type', /json/)
            .expect(200)
            .then((res) => {
                expect(res.statusCode).toBe(200);
            })
    });
});