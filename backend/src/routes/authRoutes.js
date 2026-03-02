import express from "express"
import { register, login, logout, me } from "../controllers/authController.js";
import { validateUserRegister, validateUserLogin } from "../middlewares/inputValidator.js";
import { verifyToken } from "../middlewares/authMiddleware.js";

const router = express.Router();


router.post("/register", validateUserRegister, register);
router.post("/login", validateUserLogin, login);
router.post("/logout", logout);
router.get("/me", verifyToken, me);

export default router;