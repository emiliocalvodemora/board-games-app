import pool from "../config/db.js";


export const getAllEventsService = async () => {
    const result = await pool.query("SELECT * FROM events");
    return result.rows;
};

export const getEventByIdService = async (id) => {
    const result = await pool.query("SELECT * FROM events WHERE id = $1", [id]);
    return result.rows[0];
};

export const createEventService = async (title, description, event_date, event_location, organizer_admin_id) => {
    const result = await pool.query(
        "INSERT INTO events (title, description, event_date, event_location, organizer_admin_id) VALUES ($1, $2, $3, $4, $5) RETURNING *",
        [title, description, event_date, event_location, organizer_admin_id]
    );
    return result.rows[0];
};

export const updateEventService = async (id, title, description, event_date, event_location, organizer_admin_id) => {
    const result = await pool.query(
        "UPDATE events SET title = $1, description = $2, event_date = $3, event_location = $4, organizer_admin_id = $5 WHERE id = $6 RETURNING *",
        [title, description, event_date, event_location, organizer_admin_id, id]
    );
    return result.rows[0];
};  

export const deleteEventService = async (id) => {
    const result = await pool.query("DELETE FROM events WHERE id = $1 RETURNING *", [id]);
    return result.rows[0];
};  
