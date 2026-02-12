import express from "express"
import { createAdmin, deleteAdmin, getAllAdmins, getAdminById, updateAdmin } from "../controllers/adminController.js";
import { validateAdmin } from "../middlewares/inputValidator.js";

const router = express.Router();

router.post("/admin", validateAdmin, createAdmin);
router.get("/admin", getAllAdmins);
router.get ("/admin/:id", getAdminById);
router.put ("/admin/:id", validateAdmin, updateAdmin);
router.delete ("/admin/:id", deleteAdmin);

export default router;