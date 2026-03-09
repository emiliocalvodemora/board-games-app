import express from  "express"
import cors from "cors"
import dotenv from "dotenv"
import pool from "./config/db.js"
import cookieParser from "cookie-parser"
import userRoutes from "./routes/userRoutes.js"
import authRoutes from "./routes/authRoutes.js"
import eventParticipationRoutes from "./routes/eventParticipationRoutes.js"
import eventRoutes from "./routes/eventRoutes.js"
import gameRoutes from "./routes/gameRoutes.js"
import matchResultRoutes from "./routes/matchResultRoutes.js"
import matchRoutes from "./routes/matchRoutes.js"
import errorHandling from "./middlewares/errorHandler.js"

dotenv.config()

const corsOptions = {
    origin: process.env.CORS_ORIGIN || "http://localhost:5173",
    credentials: true
}

const app = express()


//Middlewares
app.use(express.json())
app.use(cors(corsOptions))
app.use(cookieParser());

//Rutas
app.use("/api", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api", eventParticipationRoutes);
app.use("/api", eventRoutes);
app.use("/api", gameRoutes);
app.use("/api", matchResultRoutes);
app.use("/api", matchRoutes);

//Middleware para manejo de errores
app.use(errorHandling);

export default app;