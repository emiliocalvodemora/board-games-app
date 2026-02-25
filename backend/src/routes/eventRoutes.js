import express from "express"
import { createEvent, deleteEvent, getAllEvents, getEventById, updateEvent } from "../controllers/eventController.js";
import { validateEvent } from "../middlewares/inputValidator.js";
import { verifyToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/event", verifyToken, validateEvent, createEvent);
router.get("/event", verifyToken, getAllEvents);
router.get ("/event/:id", verifyToken, getEventById);
router.put ("/event/:id", verifyToken, validateEvent, updateEvent);
router.delete ("/event/:id", verifyToken, deleteEvent);

export default router;