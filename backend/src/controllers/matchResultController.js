import { 
    createMatchResultService, 
    deleteMatchResultService, 
    getAllMatchResultsService, 
    getMatchResultByIdService,
    updateMatchResultService,
    getMatchResultsByMatchIdService 
} from "../models/matchResultModel.js";

//Standard response function
const handleResponse = (res, status, message, data = null) => {
    res.status(status).json({
        status,
        message,
        data
    });
};

export const createMatchResult = async (req, res, next) => {
    const { matchId, playerId, score } = req.body;
    try {
        const newMatchResult = await createMatchResultService(matchId, playerId, score);
        handleResponse(res, 201, "Resultado de partido creado con éxito", newMatchResult);
    } catch (err) {
        next(err);
    }
};

export const getAllMatchResults = async (req, res, next) => {
    try {
        const matchResults = await getAllMatchResultsService();
        handleResponse(res, 200, "Resultados de partidos obtenidos con éxito", matchResults);
    } catch (err) {
        next(err);
    }
};

export const getMatchResultById = async (req, res, next) => {
    try {
        const matchResult = await getMatchResultByIdService(req.params.matchId, req.params.playerId);
        if (!matchResult) {
            return handleResponse(res, 404, "Resultado de partido no encontrado");
        }
        handleResponse(res, 200, "Resultado de partido obtenido con éxito", matchResult);
    } catch (err) {
        next(err);
    }
};

export const updateMatchResult = async (req, res, next) => {
    const { matchId, playerId, score } = req.body;
    try {
        const updatedMatchResult = await updateMatchResultService(matchId, playerId, score);
        if (!updatedMatchResult) {
            return handleResponse(res, 404, "Resultado de partido no encontrado");
        }
        handleResponse(res, 200, "Resultado de partido actualizado con éxito", updatedMatchResult);
    } catch (err) {
        next(err);
    }
};

export const deleteMatchResult = async (req, res, next) => {
    const { matchId, playerId} = req.params;
    try {
        const deletedMatchResult = await deleteMatchResultService(matchId, playerId);
        if (!deletedMatchResult) {
            return handleResponse(res, 404, "Resultado de partido no encontrado");
        }
        handleResponse(res, 200, "Resultado de partido borrado con éxito", deletedMatchResult);
    } catch (err) {
        next(err);
    }
};

export const getMatchResultsByMatchId = async (req, res, next) => {
    try {
        const matchResults = await getMatchResultsByMatchIdService(req.params.matchId);
        if (!matchResults || matchResults.length === 0) {
            return handleResponse(res, 404, "Resultados de partido no encontrados para el matchId proporcionado");
        }
        handleResponse(res, 200, "Resultados de partido obtenidos con éxito", matchResults);
    } catch (err) {
        next(err);
    }
};