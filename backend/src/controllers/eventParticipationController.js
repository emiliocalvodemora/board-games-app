import { 
    createEventParticipationService, 
    deleteEventParticipationService, 
    getAllEventParticipationsService, 
    getEventParticipationByIdService,
    updateEventParticipationService 
} from "../models/eventParticipationModel.js";

//Standard response function
const handleResponse = (res, status, message, data = null) => {
    res.status(status).json({
        status,
        message,
        data
    });
};

export const createEventParticipation = async (req, res, next) => {
    const { eventId, playerId, ranking } = req.body;
    try {
        const newEventParticipation = await createEventParticipationService(eventId, playerId, ranking);
        handleResponse(res, 201, "Participación en evento creada con éxito", newEventParticipation);
    } catch (err) {
        next(err);
    }
};

export const getAllEventParticipations = async (req, res, next) => {
    try {
        const eventParticipations = await getAllEventParticipationsService();
        handleResponse(res, 200, "Participaciones en eventos obtenidas con éxito", eventParticipations);
    } catch (err) {
        next(err);
    }
};

export const getEventParticipationById = async (req, res, next) => {
    try {
        const eventParticipation = await getEventParticipationByIdService(req.params.eventId, req.params.playerId);
        if (!eventParticipation) {
            return handleResponse(res, 404, "Participación en evento no encontrada");
        }
        handleResponse(res, 200, "Participación en evento obtenida con éxito", eventParticipation);
    } catch (err) {
        next(err);
    }
};

export const updateEventParticipation = async (req, res, next) => {
    const { eventId, playerId, ranking } = req.body;
    try {
        const updatedEventParticipation = await updateEventParticipationService(eventId, playerId, ranking);
        if (!updatedEventParticipation) {
            return handleResponse(res, 404, "Participación en evento no encontrada");
        }
        handleResponse(res, 200, "Participación en evento actualizada con éxito", updatedEventParticipation);
    } catch (err) {
        next(err);
    }
};

export const deleteEventParticipation = async (req, res, next) => {
    const { eventId, playerId} = req.body;
    try {
        const deletedEventParticipation = await deleteEventParticipationService(eventId, playerId);
        if (!deletedEventParticipation) {
            return handleResponse(res, 404, "Participación en evento no encontrada");
        }
        handleResponse(res, 200, "Participación en evento borrada con éxito", deletedEventParticipation);
    } catch (err) {
        next(err);
    }
};