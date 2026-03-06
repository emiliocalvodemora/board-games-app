import { createMatchService, 
    deleteMatchService, 
    getAllMatchsService, 
    getMatchByIdService, 
    updateMatchService, 
    getUserMatchesService, 
    getNotUserMatchesService
} from "../models/matchModel.js";

const handleResponse = (res, status, message, data = null) => {
    res.status(status).json({
        status,
        message,
        data
    });
};

export const createMatch = async (req, res, next) => {
    const {gameId, eventId, startTime, endTime } = req.body;
    try {
        const newMatch = await createMatchService(gameId, eventId, startTime, endTime);
        handleResponse(res, 201, "Partida creada con éxito", newMatch);
    } catch (err) {
        next(err);
    }
};

export const getAllMatches = async (req, res, next) => {
    try {
        const matches = await getAllMatchsService();
        handleResponse(res, 200, "Partidas obtenidas con éxito", matches);
    } catch (err) {
        next(err);
    }
};

export const getMatchById = async (req, res, next) => {
    try {
        const match = await getMatchByIdService(req.params.id);
        if (!match) {
            return handleResponse(res, 404, "Partida no encontrada");
        }
        handleResponse(res, 200, "Partida obtenida con éxito", match);
    } catch (err) {
        next(err);
    }
};

export const updateMatch = async (req, res, next) => {
    const {gameId, eventId, startTime, endTime } = req.body;
    try {
        const updatedMatch = await updateMatchService(req.params.id, gameId, eventId, startTime, endTime);
        if (!updatedMatch) {
            return handleResponse(res, 404, "Partida no encontrada");
        }
        handleResponse(res, 200, "Partida actualizada con éxito", updatedMatch);
    } catch (err) {
        next(err);
    }
};

export const deleteMatch = async (req, res, next) => {
    try {
        const deletedMatch = await deleteMatchService(req.params.id);
        if (!deletedMatch) {
            return handleResponse(res, 404, "Partida no encontrada");
        }
        handleResponse(res, 200, "Partida borrada con éxito", deletedMatch);
    } catch (err) {
        next(err);
    }
};

export const getUserMatches = async (req, res, next) => {
    const userId = req.user.id;
    try {
        const matches = await getUserMatchesService(userId);
        handleResponse(res, 200, "Mis partidas obtenidas con éxito", matches);
    } catch (err) {
        next(err);
    }
};

export const getNotUserMatches = async (req, res, next) => {
    const userId = req.user.id;
    try {
        const matches = await getNotUserMatchesService(userId);
        handleResponse(res, 200, "Partidas de otros jugadores obtenidas con éxito", matches);
    } catch (err) {
        next(err);
    }
};