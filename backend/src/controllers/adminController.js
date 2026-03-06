import { createAdminService, deleteAdminService, getAllAdminsService, getAdminByIdService, updateAdminService } from "../models/adminModel.js";
import argon2 from "argon2";


const handleResponse = (res, status, message, data = null) => {
    res.status(status).json({
        status,
        message,
        data
    });
};

export const createAdmin = async (req, res, next) => {
    const { name, email, password } = req.body;
    try {
        const password_hash = await argon2.hash(password, {type: argon2.argon2id});
        const newAdmin = await createAdminService(name, email, password_hash);
        handleResponse(res, 201, "Administrador creado con éxito", newAdmin);
    } catch (err) {
        next(err);
    }
};

export const getAllAdmins = async (req, res, next) => {
    try {
        const admins = await getAllAdminsService();
        handleResponse(res, 200, "Administradores obtenidos con éxito", admins);
    } catch (err) {
        next(err);
    }
};

export const getAdminById = async (req, res, next) => {
    try {
        const admin = await getAdminByIdService(req.params.id);
        if (!admin) {
            return handleResponse(res, 404, "Administrador no encontrado");
        }
        handleResponse(res, 200, "Administrador obtenido con éxito", admin);
    } catch (err) {
        next(err);
    }
};

export const updateAdmin = async (req, res, next) => {
    const { name, email, password } = req.body;
    try {
        const password_hash = await argon2.hash(password, {type: argon2.argon2id});
        const updatedAdmin = await updateAdminService(req.params.id, name, email, password_hash);
        if (!updatedAdmin) {
            return handleResponse(res, 404, "Administrador no encontrado");
        }
        handleResponse(res, 200, "Administrador actualizado con éxito", updatedAdmin);
    } catch (err) {
        next(err);
    }
};

export const deleteAdmin = async (req, res, next) => {
    try {
        const deletedAdmin = await deleteAdminService(req.params.id);
        if (!deletedAdmin) {
            return handleResponse(res, 404, "Administrador no encontrado");
        }
        handleResponse(res, 200, "Administrador borrado con éxito", deletedAdmin);
    } catch (err) {
        next(err);
    }
};