import express from "express"
import { createUser, deleteUser, getAllUsers, getUserById, getUserByName, updateUser, getUser } from "../controllers/userController.js";
import { validateUser } from "../middlewares/inputValidator.js";
import { verifyToken } from "../middlewares/authMiddleware.js";
import { authorizeRoles } from "../middlewares/roleMiddleware.js";


const router = express.Router();

router.post("/user", validateUser, createUser);
router.get("/users", getAllUsers);
router.get ("/user/id/:id", getUserById);
router.get ("/user/name/:name", getUserByName);
router.get("/user", getUser);
router.put ("/user/:id", validateUser, updateUser);
router.delete ("/user/:id", validateUser, deleteUser);

router.get("/protected", verifyToken, authorizeRoles(["admin"]), (req, res) => {
    res.json({ message: "Acceso a ruta protegida exitoso", user: req.user });
});

export default router;