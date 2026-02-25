import express from "express"
import { register, login } from "../controllers/authController.js";
import { validateUserRegister, validateUserLogin } from "../middlewares/inputValidator.js";

const router = express.Router();

router.post("/register", validateUserRegister, register);
router.post("/login", validateUserLogin, login);

export default router;