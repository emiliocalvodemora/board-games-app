import pool from "../config/db.js";


export const getAllMatchResultsService = async () => {
    const result = await pool.query("SELECT * FROM match_results");
    return result.rows;
};

export const getMatchResultByIdService = async (matchId, playerId) => {
const result = await pool.query("SELECT * FROM match_results WHERE match_id = $1 AND player_id = $2", [matchId, playerId]); return result.rows[0]; }; export const createMatchResultService = async (matchId, playerId, score) => { const result = await pool.query( "INSERT INTO match_results (match_id, player_id, score) VALUES ($1, $2, $3) RETURNING *", [matchId, playerId, score]
    );
    return result.rows[0];
};

export const updateMatchResultService = async (matchId, playerId, score) => {
    const result = await pool.query(
        "UPDATE match_results SET match_id = $1, player_id = $2, score = $3 WHERE match_id = $1 AND player_id = $2 RETURNING *",
        [matchId, playerId, score]
    );
    return result.rows[0];
};  

export const deleteMatchResultService = async (matchId, playerId) => {
    const result = await pool.query("DELETE FROM match_results WHERE match_id = $1 AND player_id = $2 RETURNING *", [matchId, playerId]);
    return result.rows[0];
};  