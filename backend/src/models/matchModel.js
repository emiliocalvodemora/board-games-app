import pool from "../config/db.js";


export const getAllMatchsService = async () => {
    const result = await pool.query("SELECT * FROM matches");
    return result.rows;
};

export const getMatchByIdService = async (id) => {
    const result = await pool.query("SELECT * FROM matches WHERE id = $1", [id]);
    return result.rows[0];
};

export const createMatchService = async (gameId, eventId, startTime, endTime) => {
    const result = await pool.query(
        "INSERT INTO matches (game_id, event_id, start_time, end_time) VALUES ($1, $2, $3, $4) RETURNING *",
        [gameId, eventId, startTime, endTime]
    );
    return result.rows[0];
};

export const updateMatchService = async (id, gameId, eventId, startTime, endTime) => {
    const result = await pool.query(
        "UPDATE matches SET game_id = $1, event_id = $2, start_time = $3, end_time = $4 WHERE id = $5 RETURNING *",
        [gameId, eventId, startTime, endTime, id]
    );
    return result.rows[0];
};  

export const deleteMatchService = async (id) => {
    const result = await pool.query("DELETE FROM matches WHERE id = $1 RETURNING *", [id]);
    return result.rows[0];
};  
