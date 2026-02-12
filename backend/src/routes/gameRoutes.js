import express from "express"
import { createGame, deleteGame, getAllGames, getGameById, updateGame } from "../controllers/gameController.js";
import { validateGame } from "../middlewares/inputValidator.js";

const router = express.Router();

router.post("/game", validateGame, createGame);
router.get("/game", getAllGames);
router.get ("/game/:id", getGameById);
router.put ("/game/:id", validateGame, updateGame);
router.delete ("/game/:id", deleteGame);

export default router;