import express from "express"
import { createEventParticipation, 
    deleteEventParticipation, 
    getAllEventParticipations, 
    getEventParticipationById,
    updateEventParticipation 
} from "../controllers/eventParticipationController.js";

const router = express.Router();

router.post("/eventParticipation", createEventParticipation);
router.get("/eventParticipation", getAllEventParticipations);
router.get ("/eventParticipation/:eventId/:playerId", getEventParticipationById);
router.put ("/eventParticipation/:eventId/:playerId", updateEventParticipation);
router.delete ("/eventParticipation/:eventId/:playerId", deleteEventParticipation);

export default router;