-- Usuarios
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(320) NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    name VARCHAR(100) UNIQUE NOT NULL,
    role VARCHAR(50) NOT NULL CHECK (role IN ('admin', 'player')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
-- -- Administradores
-- CREATE TABLE admins (
--     id SERIAL PRIMARY KEY,
--     email VARCHAR(320) NOT NULL,
--     password_hash VARCHAR(255) NOT NULL,
--     name VARCHAR(100) NOT NULL,
--     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
-- );

-- -- Jugadores
-- CREATE TABLE players (
--     id SERIAL PRIMARY KEY,
--     email VARCHAR(320) NOT NULL,
--     password_hash VARCHAR(255) NOT NULL,
--     name VARCHAR(100) NOT NULL,
--     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
-- );

-- Juegos
CREATE TABLE games (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    min_players INT NOT NULL CHECK (min_players > 0),
    max_players INT NOT NULL CHECK (max_players >= min_players)
);

-- Eventos
CREATE TABLE events (
    id SERIAL PRIMARY KEY,
    title VARCHAR(150) NOT NULL,
    description TEXT,
    event_date TIMESTAMP NOT NULL,
    event_location VARCHAR(255),
    organizer_admin_id INT NOT NULL,
    FOREIGN KEY (organizer_admin_id)
        REFERENCES users(id)
        ON DELETE CASCADE
);

-- Partidas
CREATE TABLE matches (
    id SERIAL PRIMARY KEY,
    game_id INT NOT NULL,
    event_id INT,
    start_time TIMESTAMP NOT NULL,
    end_time TIMESTAMP,
    FOREIGN KEY (game_id) REFERENCES games(id),
    FOREIGN KEY (event_id) REFERENCES events(id)
);

-- Participación en eventos
CREATE TABLE event_participations (
    event_id INT NOT NULL,
    player_id INT NOT NULL,
    ranking INT,
    PRIMARY KEY (event_id, player_id),
    FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE,
    FOREIGN KEY (player_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Resultados de partidas
CREATE TABLE match_results (
    match_id INT NOT NULL,
    player_id INT NOT NULL,
    score INT,
    PRIMARY KEY (match_id, player_id),
    FOREIGN KEY (match_id) REFERENCES matches(id) ON DELETE CASCADE,
    FOREIGN KEY (player_id) REFERENCES users(id) ON DELETE CASCADE
);
