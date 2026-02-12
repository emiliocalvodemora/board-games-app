import express from  "express"
import cors from "cors"
import dotenv from "dotenv"
import pool from "./config/db.js"
import adminRoutes from "./routes/adminRoutes.js"
import playerRoutes from "./routes/playerRoutes.js"
//import eventParticipationRoutes from "./routes/eventParticipationRoutes.js"
import eventRoutes from "./routes/eventRoutes.js"
import gameRoutes from "./routes/gameRoutes.js"
//import matchResultRoutes from "./routes/matchResultRoutes.js"
import matchRoutes from "./routes/matchRoutes.js"
import errorHandling from "./middlewares/errorHandler.js"   

dotenv.config()

const app = express()
const port = process.env.PORT || 3001;


//Middlewares
app.use(express.json())
app.use(cors())

//Routes

app.use("/api", adminRoutes);
app.use("/api", playerRoutes);
//app.use("/api", eventParticipationRoutes);
app.use("/api", eventRoutes);
app.use("/api", gameRoutes);
//app.use("/api", matchResultRoutes);
app.use("/api", matchRoutes);

//Error handling middleware
app.use(errorHandling);

//Testing POSTGRES Connection
app.get("/", async (req, res) => {
    const result = await pool.query("SELECT current_database()")
    res.send(`The database name is : ${result.rows[0].current_database}`)
});

//Server running
app.listen(port, () => {
    console.log(`Server running on http:localhost:${port}`)
})