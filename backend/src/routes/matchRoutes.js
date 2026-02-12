import express from "express"
import { createMatch, deleteMatch, getAllMatches, getMatchById, updateMatch } from "../controllers/matchController.js";
import { validateMatch} from "../middlewares/inputValidator.js";

const router = express.Router();

router.post("/match", validateMatch, createMatch);
router.get("/match", getAllMatches);
router.get ("/match/:id", getMatchById);
router.put ("/match/:id", validateMatch, updateMatch);
router.delete ("/match/:id", deleteMatch);

export default router;