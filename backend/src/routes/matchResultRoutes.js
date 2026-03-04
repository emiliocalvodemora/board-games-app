import express from "express"
import { createMatchResult, 
    deleteMatchResult, 
    getAllMatchResults, 
    getMatchResultById, 
    getMatchResultsByMatchId,
    updateMatchResult } 
    from "../controllers/matchResultController.js";
import { verifyToken } from "../middlewares/authMiddleware.js";
import { authorizeRoles } from "../middlewares/roleMiddleware.js";

const router = express.Router();

router.post("/matchResult", verifyToken, authorizeRoles(["admin", "player"]), createMatchResult);
router.get("/matchResults", verifyToken, authorizeRoles(["admin", "player"]), getAllMatchResults);
router.get ("/matchResult/:matchId/:playerId", verifyToken, authorizeRoles(["admin", "player"]), getMatchResultById);
router.get ("/matchResults/:matchId", verifyToken, authorizeRoles(["admin", "player"]), getMatchResultsByMatchId);
router.put ("/matchResult/:matchId/:playerId", verifyToken, authorizeRoles(["admin", "player"]), updateMatchResult);
router.delete ("/matchResult/:matchId/:playerId", verifyToken, authorizeRoles(["admin", "player"]), deleteMatchResult);

export default router;