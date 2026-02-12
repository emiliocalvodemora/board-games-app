import pool from "../config/db.js";


export const getAllEventParticipationsService = async () => {
    const result = await pool.query("SELECT * FROM event_participations");
    return result.rows;
};

export const getEventParticipationByIdService = async (eventId, playerId) => {
const result = await pool.query("SELECT * FROM event_participations WHERE event_id = $1 AND player_id = $2", [eventId, playerId]); return result.rows[0]; }; export const createEventParticipationService = async (eventId, playerId, ranking) => { const result = await pool.query( "INSERT INTO event_participations (event_id, player_id, ranking) VALUES ($1, $2, $3) RETURNING *", [eventId, playerId, ranking]
    );
    return result.rows[0];
};

export const updateEventParticipationService = async (eventId, playerId, ranking) => {
    const result = await pool.query(
        "UPDATE event_participations SET event_id = $1, player_id = $2, ranking = $3 WHERE event_id = $1 AND player_id = $2 RETURNING *",
        [eventId, playerId, ranking]
    );
    return result.rows[0];
};  

export const deleteEventParticipationService = async (eventId, playerId) => {
    const result = await pool.query("DELETE FROM event_participations WHERE event_id = $1 AND player_id = $2 RETURNING *", [eventId, playerId]);
    return result.rows[0];
};  