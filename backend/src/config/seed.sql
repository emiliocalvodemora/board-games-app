-- =====================================
-- RESET
-- =====================================
TRUNCATE match_results,
         event_participations,
         matches,
         events,
         games,
         users
RESTART IDENTITY CASCADE;


-- =====================================
-- USUARIOS
-- password = 123456
-- =====================================
INSERT INTO users (email, password_hash, name, role) VALUES

-- ADMINS
('admin1@boardgames.com',
 '$argon2id$v=19$m=65536,t=3,p=4$uW1xQW5kU2VlZEZvclRGRw$H6sJz7v1lXw5H8qW0xN5y0zZ4y3p8VQkM3x1pZ8KxY0',
 'Administrador Uno',
 'admin'),

('admin2@boardgames.com',
 '$argon2id$v=19$m=65536,t=3,p=1$uW1xQW5kU2VlZEZvclRGRw$H6sJz7v1lXw5H8qW0xN5y0zZ4y3p8VQkM3x1pZ8KxY0',
 'Administrador Dos',
 'admin'),

-- PLAYERS
('alicia@test.com',
 '$argon2id$v=19$m=65536,t=3,p=1$uW1xQW5kU2VlZEZvclRGRw$H6sJz7v1lXw5H8qW0xN5y0zZ4y3p8VQkM3x1pZ8KxY0',
 'Alicia',
 'player'),

('juan@test.com',
 '$argon2id$v=19$m=65536,t=3,p=1$uW1xQW5kU2VlZEZvclRGRw$H6sJz7v1lXw5H8qW0xN5y0zZ4y3p8VQkM3x1pZ8KxY0',
 'Juan',
 'player'),

('pepe@test.com',
 '$argon2id$v=19$m=65536,t=3,p=1$uW1xQW5kU2VlZEZvclRGRw$H6sJz7v1lXw5H8qW0xN5y0zZ4y3p8VQkM3x1pZ8KxY0',
 'pepe',
 'player'),

('diana@test.com',
 '$argon2id$v=19$m=65536,t=3,p=1$uW1xQW5kU2VlZEZvclRGRw$H6sJz7v1lXw5H8qW0xN5y0zZ4y3p8VQkM3x1pZ8KxY0',
 'Diana',
 'player');

-- =====================================
-- JUEGOS
-- =====================================
INSERT INTO games (name, description, min_players, max_players) VALUES
('Catan', 'Juego de estrategia y comercio', 3, 4),
('Carcassonne', 'Colocación de losetas medieval', 2, 5),
('Chess', 'Juego clásico de estrategia', 2, 2),
('Terraforming Mars', 'Estrategia espacial avanzada', 1, 5);


-- =====================================
-- EVENTOS
-- =====================================
INSERT INTO events (title, description, event_date, event_location, organizer_admin_id) VALUES
('Torneo Oficial Catan',
 'Competición oficial con ranking',
 '2026-03-15 16:00:00',
 'Córdoba',
 1),

('Noche Casual de Juegos',
 'Evento social abierto',
 '2026-03-20 18:00:00',
 'La Rioja',
 2);


-- =====================================
-- PARTIDAS
-- =====================================
INSERT INTO matches (game_id, event_id, start_time, end_time) VALUES
(1, 1, '2026-03-15 16:00:00', '2026-03-15 18:00:00'),
(1, 1, '2026-03-15 18:30:00', '2026-03-15 20:00:00'),
(2, 2, '2026-03-20 18:30:00', '2026-03-20 20:00:00'),
(3, NULL, '2026-03-10 17:00:00', '2026-03-10 18:00:00');


-- =====================================
-- PARTICIPACIONES EN EVENTOS
-- =====================================
INSERT INTO event_participations (event_id, player_id, ranking) VALUES
(1, 1, 1),
(1, 2, 2),
(1, 3, 3),
(2, 2, 1),
(2, 4, 2);


-- =====================================
-- RESULTADOS DE PARTIDAS
-- =====================================
INSERT INTO match_results (match_id, player_id, score) VALUES
(1, 1, 10),
(1, 2, 8),
(1, 3, 6),

(2, 1, 7),
(2, 2, 10),
(2, 3, 9),

(3, 2, 15),
(3, 4, 12),

(4, 2, 15),
(4, 3, 12);
