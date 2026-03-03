import { createEventService, deleteEventService, getAllEventsService, getEventByIdService, updateEventService, getEventByAdminIdService, getUserEventsService } from "../models/eventModel.js";

//Standard response function
const handleResponse = (res, status, message, data = null) => {
    res.status(status).json({
        status,
        message,
        data
    });
};

export const createEvent = async (req, res, next) => {
    const { title, description, event_date, event_location, organizer_admin_id } = req.body;
    try {
        const newEvent = await createEventService(title, description, event_date, event_location, organizer_admin_id);
        handleResponse(res, 201, "Evento creado con éxito", newEvent);
    } catch (err) {
        next(err);
    }
};

export const getAllEvents = async (req, res, next) => {
    try {
        const events = await getAllEventsService();
        handleResponse(res, 200, "Eventos obtenidos con éxito", events);
    } catch (err) {
        next(err);
    }
};

export const getEventById = async (req, res, next) => {
    try {
        const event = await getEventByIdService(req.params.id);
        if (!event) {
            return handleResponse(res, 404, "Evento no encontrado");
        }
        handleResponse(res, 200, "Evento obtenido con éxito", event);
    } catch (err) {
        next(err);
    }
};

export const getEventByAdminId = async (req, res, next) => {
    try {
        const event = await getEventByAdminIdService(req.params.id);
        if (!event) {
            return handleResponse(res, 404, "Evento no encontrado");
        }
        handleResponse(res, 200, "Evento obtenido con éxito", event);
    } catch (err) {
        next(err);
    }
};

export const updateEvent = async (req, res, next) => {
    const { title, description, event_date, event_location, organizer_admin_id } = req.body;
    try {
        const updatedEvent = await updateEventService(req.params.id, title, description, event_date, event_location, organizer_admin_id);
        if (!updatedEvent) {
            return handleResponse(res, 404, "Evento no encontrado");
        }
        handleResponse(res, 200, "Evento actualizado con éxito", updatedEvent);
    } catch (err) {
        next(err);
    }
};

export const deleteEvent = async (req, res, next) => {
    try {
        const deletedEvent = await deleteEventService(req.params.id);
        if (!deletedEvent) {
            return handleResponse(res, 404, "Evento no encontrado");
        }
        handleResponse(res, 200, "Evento borrado con éxito", deletedEvent);
    } catch (err) {
        next(err);
    }
};

export const getUserEvents = async (req, res, next) => {
    try {
        const events = await getUserEventsService(req.user.id);
        handleResponse(res, 200, "Eventos del usuario obtenidos con éxito", events);
    } catch (err) {
        next(err);
    }   
};