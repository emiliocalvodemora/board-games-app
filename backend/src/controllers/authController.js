import { createUserService, deleteUserService, getAllUsersService, getUserByIdService, updateUserService, getUserByNameService } from "../models/userModel.js";

import argon2 from "argon2";
import jwt from "jsonwebtoken";

const handleResponse = (res, status, message, data = null) => {
    res.status(status).json({
        status,
        message,
        data
    });
};

const cookieOptions = {
    httpOnly: true,
    secure: false,
    // secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000
};

export const register = async(req, res, next) => {
    const { name, email, password, role } = req.body;
    try {
        const password_hash = await argon2.hash(password, {type: argon2.argon2id});
        const newUser = await createUserService(name, email, password_hash, role);
        handleResponse(res, 201, "Usuario creado con éxito", newUser);
    } catch (err) {
        next(err);
    }
}
export const login = async(req, res, next) => {
    try {
    const { name, password } = req.body;
    const user = await getUserByNameService(name);
    if (!user) {
        return handleResponse(res, 404, "Usuario no encontrado");

    }
    const isPasswordValid = await argon2.verify(user.password_hash, password);
    if (!isPasswordValid) {
        return handleResponse(res, 401, "Contraseña incorrecta");
    }
    const token = jwt
    .sign({ 
        id: user.id, name: user.name, email: user.email, role: user.role }, 
        process.env.JWT_SECRET, 
        { expiresIn: "7d" });
    res.cookie("token", token, cookieOptions);
    handleResponse(res, 200, "Login exitoso", {
        id: user.id, name: user.name, email: user.email, role: user.role
    });
    } catch (err) {
        next(err);
    }
}

export const me = async(req, res) => {
    handleResponse(res, 200, "Perfil del usuario", req.user);
}


export const logout = (req, res) => {
    res.clearCookie("token", cookieOptions);
    handleResponse(res, 200, "Logout exitoso");
}