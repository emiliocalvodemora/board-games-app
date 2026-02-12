import pool from "../config/db.js";


export const getAllPlayersService = async () => {
    const result = await pool.query("SELECT * FROM players");
    return result.rows;
};

export const getPlayerByIdService = async (id) => {
    const result = await pool.query("SELECT * FROM players WHERE id = $1", [id]);
    return result.rows[0];
};

export const createPlayerService = async (name, email, password_hash) => {
    const result = await pool.query(
        "INSERT INTO players (name, email, password_hash) VALUES ($1, $2, $3) RETURNING *",
        [name, email, password_hash]
    );
    return result.rows[0];
};

export const updatePlayerService = async (id, name, email, password) => {
    const result = await pool.query(
        "UPDATE players SET name = $1, email = $2, password_hash = $3 WHERE id = $4 RETURNING *",
        [name, email, password, id]
    );
    return result.rows[0];
};  

export const deletePlayerService = async (id) => {
    const result = await pool.query("DELETE FROM players WHERE id = $1 RETURNING *", [id]);
    return result.rows[0];
};  
