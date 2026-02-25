import express from "express"
import { createGame, deleteGame, getAllGames, getGameById, updateGame } from "../controllers/gameController.js";
import { validateGame } from "../middlewares/inputValidator.js";
import { verifyToken } from "../middlewares/authMiddleware.js";
import { authorizeRoles } from "../middlewares/roleMiddleware.js";

const router = express.Router();

router.post("/game", verifyToken, authorizeRoles(["admin", "player"]), validateGame, createGame);
router.get("/game", verifyToken, authorizeRoles(["admin", "player"]), getAllGames);
router.get ("/game/:id", verifyToken, authorizeRoles(["admin", "player"]), getGameById);
router.put ("/game/:id", verifyToken, authorizeRoles(["admin", "player"]), validateGame, updateGame);
router.delete ("/game/:id", verifyToken, authorizeRoles(["admin", "player"]), deleteGame);

export default router;