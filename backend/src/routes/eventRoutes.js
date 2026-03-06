import express from "express"
import { createEvent, 
    deleteEvent, 
    getAllEvents, 
    getEventById, 
    updateEvent, 
    getEventByAdminId, 
    getUserEvents, 
    getNotUserEvents } from "../controllers/eventController.js";
import { validateEvent } from "../middlewares/inputValidator.js";
import { verifyToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/event", verifyToken, validateEvent, createEvent);
router.get("/event", verifyToken, getAllEvents);
router.get ("/event/:id", verifyToken, getEventById);
router.get ("/event/admin/:id", verifyToken, getEventByAdminId);
router.put ("/event/:id", verifyToken, validateEvent, updateEvent);
router.delete ("/event/:id", verifyToken, deleteEvent);

router.get("/my-events", verifyToken, getUserEvents);
router.get("/other-events", verifyToken, getNotUserEvents);

export default router;