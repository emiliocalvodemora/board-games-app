import { createUserService, deleteUserService, getAllUsersService, getUserByIdService, updateUserService, getUserByNameService } from "../models/userModel.js";
import argon2 from "argon2";

const handleResponse = (res, status, message, data = null) => {
    res.status(status).json({
        status,
        message,
        data
    });
};

export const createUser = async (req, res, next) => {
    const { name, email, password, role } = req.body;
    try {
        const password_hash = await argon2.hash(password, {type: argon2.argon2id});
        
        console.log(req.body);
        console.log("name");
        console.log(name);
        console.log("email");
        console.log(email);
        console.log("password_hash");
        console.log(password_hash);
        console.log("role");
        console.log(role);
        const newUser = await createUserService(name, email, password_hash, role);
        handleResponse(res, 201, "Usuario creado con éxito", newUser);
    } catch (err) {
        next(err);
    }
};

export const getAllUsers = async (req, res, next) => {
    try {
        const users = await getAllUsersService();
        handleResponse(res, 200, "Usuarios obtenidos con éxito", users);
    } catch (err) {
        next(err);
    }
};

export const getUserById = async (req, res, next) => {
    try {
        const user = await getUserByIdService(req.params.id);
        if (!user) {
            return handleResponse(res, 404, "Usuario no encontrado");
        }
        handleResponse(res, 200, "Usuario obtenido con éxito", user);
    } catch (err) {
        next(err);
    }
};

export const getUserByName = async (req, res, next) => {
    try {
        const user = await getUserByNameService(req.params.name);
        if (!user) {
            return handleResponse(res, 404, "Usuario no encontrado");
        }
        handleResponse(res, 200, "Usuario obtenido con éxito", user);
    } catch (err) {
        next(err);
    }
};

export const getUser = async (req, res, next) => {
    const { id, name } = req.query;
    if (id) {
        try {
        const user = await getUserByIdService(id);
            if (!user) {
                return handleResponse(res, 404, "Usuario no encontrado");
            }
            handleResponse(res, 200, "Usuario obtenido con éxito", user);
        } catch (err) {
            next(err);
        }
    } else if (name) {
        try {
            const user = await getUserByNameService(name);
            if (!user) {
                return handleResponse(res, 404, "Usuario no encontrado");
            }
            handleResponse(res, 200, "Usuario obtenido con éxito", user);
        } catch (err) {
            next(err);
        }
    }
};


export const updateUser = async (req, res, next) => {
    const { name, email, password } = req.body;
    try {
        const password_hash = await argon2.hash(password, {type: argon2.argon2id});
        const updatedUser = await updateUserService(req.params.id, name, email, password_hash);
        if (!updatedUser) {
            return handleResponse(res, 404, "Usuario no encontrado");
        }
        handleResponse(res, 200, "Usuario actualizado con éxito", updatedUser);
    } catch (err) {
        next(err);
    }
};

export const deleteUser = async (req, res, next) => {
    try {
        const deletedUser = await deleteUserService(req.params.id);
        if (!deletedUser) {
            return handleResponse(res, 404, "Usuario no encontrado");
        }
        handleResponse(res, 200, "Usuario borrado con éxito", deletedUser);
    } catch (err) {
        next(err);
    }
};