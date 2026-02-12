import { createGameService, deleteGameService, getAllGamesService, getGameByIdService, updateGameService } from "../models/gameModel.js";

//Standard response function
const handleResponse = (res, status, message, data = null) => {
    res.status(status).json({
        status,
        message,
        data
    });
};

export const createGame = async (req, res, next) => {
    const { name, description, minPlayers, maxPlayers } = req.body;
    try {
        const newGame = await createGameService(name, description, minPlayers, maxPlayers);
        handleResponse(res, 201, "Juego creado con éxito", newGame);
    } catch (err) {
        next(err);
    }
};

export const getAllGames = async (req, res, next) => {
    try {
        const games = await getAllGamesService();
        handleResponse(res, 200, "Juegos obtenidos con éxito", games);
    } catch (err) {
        next(err);
    }
};

export const getGameById = async (req, res, next) => {
    try {
        const game = await getGameByIdService(req.params.id);
        if (!game) {
            return handleResponse(res, 404, "Juego no encontrado");
        }
        handleResponse(res, 200, "Juego obtenido con éxito", game);
    } catch (err) {
        next(err);
    }
};

export const updateGame = async (req, res, next) => {
    const { name, description, minPlayers, maxPlayers } = req.body;
    try {
        const updatedGame = await updateGameService(req.params.id, name, description, minPlayers, maxPlayers);
        if (!updatedGame) {
            return handleResponse(res, 404, "Juego no encontrado");
        }
        handleResponse(res, 200, "Juego actualizado con éxito", updatedGame);
    } catch (err) {
        next(err);
    }
};

export const deleteGame = async (req, res, next) => {
    try {
        const deletedGame = await deleteGameService(req.params.id);
        if (!deletedGame) {
            return handleResponse(res, 404, "Juego no encontrado");
        }
        handleResponse(res, 200, "Juego borrado con éxito", deletedGame);
    } catch (err) {
        next(err);
    }
};