import express from "express"
import { createEventParticipation, 
    deleteEventParticipation, 
    getAllEventParticipations, 
    getEventParticipationById,
    updateEventParticipation,
    getEventParticipationByPlayerId
} from "../controllers/eventParticipationController.js";
import { verifyToken } from "../middlewares/authMiddleware.js";
import { authorizeRoles } from "../middlewares/roleMiddleware.js";

const router = express.Router();

router.post("/eventParticipation", verifyToken, authorizeRoles(["admin", "player"]), createEventParticipation);
router.get("/eventParticipation", verifyToken, authorizeRoles(["admin", "player"]), getAllEventParticipations);
router.get ("/eventParticipation/:playerId", verifyToken, authorizeRoles(["admin", "player"]), getEventParticipationByPlayerId);
router.get ("/eventParticipation/:eventId/:playerId", verifyToken, authorizeRoles(["admin", "player"]), getEventParticipationById);
router.put ("/eventParticipation/:eventId/:playerId", verifyToken, authorizeRoles(["admin", "player"]), updateEventParticipation);
router.delete ("/eventParticipation/:eventId/:playerId", verifyToken, authorizeRoles(["admin", "player"]), deleteEventParticipation);

export default router;