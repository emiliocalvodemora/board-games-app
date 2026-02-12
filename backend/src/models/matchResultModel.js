import pool from "../config/db.js";


export const getAllAdminsService = async () => {
    const result = await pool.query("SELECT * FROM admins");
    return result.rows;
};

export const getAdminByIdService = async (id) => {
    const result = await pool.query("SELECT * FROM admins WHERE admin_id = $1", [id]);
    return result.rows[0];
};

export const createAdminService = async (name, email, password_hash) => {
    const result = await pool.query(
        "INSERT INTO admins (name, email, password_hash) VALUES ($1, $2, $3) RETURNING *",
        [name, email, password_hash]
    );
    return result.rows[0];
};

export const updateAdminService = async (id, name, email, password) => {
    const result = await pool.query(
        "UPDATE admins SET name = $1, email = $2, password_hash = $3 WHERE id = $4 RETURNING *",
        [name, email, password, id]
    );
    return result.rows[0];
};  

export const deleteAdminService = async (id) => {
    const result = await pool.query("DELETE FROM admins WHERE admin_id = $1 RETURNING *", [id]);
    return result.rows[0];
};  
