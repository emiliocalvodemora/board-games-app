import express from "express"
import { createPlayer, deletePlayer, getAllPlayers, getPlayerById, updatePlayer } from "../controllers/playerController.js";
import { validatePlayer } from "../middlewares/inputValidator.js";

const router = express.Router();

router.post("/player", validatePlayer, createPlayer);
router.get("/player", getAllPlayers);
router.get ("/player/:id", getPlayerById);
router.put ("/player/:id", validatePlayer, updatePlayer);
router.delete ("/player/:id", deletePlayer);

export default router;