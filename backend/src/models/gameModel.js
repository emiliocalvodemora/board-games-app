import pool from "../config/db.js";


export const getAllGamesService = async () => {
    const result = await pool.query("SELECT * FROM games");
    return result.rows;
};

export const getGameByIdService = async (id) => {
    const result = await pool.query("SELECT * FROM games WHERE id = $1", [id]);
    return result.rows[0];
};

export const createGameService = async (name, description, minPlayers, maxPlayers) => {
    const result = await pool.query(
        "INSERT INTO games (name, description, min_players, max_players) VALUES ($1, $2, $3, $4) RETURNING *",
        [name, description, minPlayers, maxPlayers]
    );
    return result.rows[0];
};

export const updateGameService = async (id, name, description, minPlayers, maxPlayers) => {
    const result = await pool.query(
        "UPDATE games SET name = $1, description = $2, min_players = $3, max_players = $4 WHERE id = $5 RETURNING *",
        [name, description, minPlayers, maxPlayers, id]
    );
    return result.rows[0];
};  

export const deleteGameService = async (id) => {
    const result = await pool.query("DELETE FROM games WHERE id = $1 RETURNING *", [id]);
    return result.rows[0];
};  
