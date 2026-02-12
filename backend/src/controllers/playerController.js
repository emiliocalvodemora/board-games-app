import { createPlayerService, deletePlayerService, getAllPlayersService, getPlayerByIdService, updatePlayerService } from "../models/playerModel.js";
import argon2 from "argon2";

//Standard response function
const handleResponse = (res, status, message, data = null) => {
    res.status(status).json({
        status,
        message,
        data
    });
};

export const createPlayer = async (req, res, next) => {
    const { name, email, password } = req.body;
    try {
        const password_hash = await argon2.hash(password, {type: argon2.argon2id});
        const newPlayer = await createPlayerService(name, email, password_hash);
        handleResponse(res, 201, "Jugador creado con éxito", newPlayer);
    } catch (err) {
        next(err);
    }
};

export const getAllPlayers = async (req, res, next) => {
    try {
        const players = await getAllPlayersService();
        handleResponse(res, 200, "Jugadores obtenidos con éxito", players);
    } catch (err) {
        next(err);
    }
};

export const getPlayerById = async (req, res, next) => {
    try {
        const player = await getPlayerByIdService(req.params.id);
        if (!player) {
            return handleResponse(res, 404, "Jugador no encontrado");
        }
        handleResponse(res, 200, "Jugador obtenido con éxito", player);
    } catch (err) {
        next(err);
    }
};

export const updatePlayer = async (req, res, next) => {
    const { name, email, password } = req.body;
    try {
        const password_hash = await argon2.hash(password, {type: argon2.argon2id});
        const updatedPlayer = await updatePlayerService(req.params.id, name, email, password_hash);
        if (!updatedPlayer) {
            return handleResponse(res, 404, "Jugador no encontrado");
        }
        handleResponse(res, 200, "Jugador actualizado con éxito", updatedPlayer);
    } catch (err) {
        next(err);
    }
};

export const deletePlayer = async (req, res, next) => {
    try {
        const deletedPlayer = await deletePlayerService(req.params.id);
        if (!deletedPlayer) {
            return handleResponse(res, 404, "Jugador no encontrado");
        }
        handleResponse(res, 200, "Jugador borrado con éxito", deletedPlayer);
    } catch (err) {
        next(err);
    }
};