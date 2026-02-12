import pool from '../config/db.js';

const createuserTable = async () => {
    const queryText = `
        CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        created_at TIMESTAMP DEFAULT NOW()
        )`;

        try {
            pool.query(queryText);
            console.log("Tabla de usuarios creada o ya existe");
        } catch (err) {
            console.log("Error creando la tabla de usuarios", err);
        }
};

export default createuserTable;