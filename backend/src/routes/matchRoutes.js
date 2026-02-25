import express from "express"
import { createMatch, deleteMatch, getAllMatches, getMatchById, updateMatch } from "../controllers/matchController.js";
import { validateMatch} from "../middlewares/inputValidator.js";
import { verifyToken } from "../middlewares/authMiddleware.js";
import { authorizeRoles } from "../middlewares/roleMiddleware.js";

const router = express.Router();

router.post("/match", validateMatch, verifyToken, authorizeRoles(["player", "admin"]), createMatch);
router.get("/match", verifyToken, authorizeRoles(["player", "admin"]), getAllMatches);
router.get ("/match/:id", verifyToken, authorizeRoles(["player", "admin"]), getMatchById);
router.put ("/match/:id", verifyToken, authorizeRoles(["player", "admin"]), validateMatch, updateMatch);
router.delete ("/match/:id", verifyToken, authorizeRoles(["player", "admin"]), deleteMatch);

export default router;