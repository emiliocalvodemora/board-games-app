import express from "express"
import { createEvent, deleteEvent, getAllEvents, getEventById, updateEvent } from "../controllers/eventController.js";
import { validateEvent } from "../middlewares/inputValidator.js";

const router = express.Router();

router.post("/event", validateEvent, createEvent);
router.get("/event", getAllEvents);
router.get ("/event/:id", getEventById);
router.put ("/event/:id", validateEvent, updateEvent);
router.delete ("/event/:id", deleteEvent);

export default router;