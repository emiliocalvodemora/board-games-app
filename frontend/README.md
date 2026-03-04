# Board Games App
Este proyecto es mi Trabajo de Fin de Grado de Ingeniería del Software en la Universidad Internacional de la Rioja.

## Descripción
El proyecto es una aplicación web para asociaciones de juegos de mesa que permite a administradores de las asociaciones crear eventos, y a los jugadores permite dejar registro de partidas, consultar información de juegos de mesa y apuntarse a dichos eventos.

## Estructura del proyecto
- frontend/: Aplicación frontend hecha con React y Vite
- backend/: API en backend hecha con Express
- db/: Usa una base de datos relacional con PostgreSQL

## Tecnologías usadas
- **Frontend:** React, Vite, tailwindCSS
- **Backend:** Node.js, Express, JWT
- **Base de datos:** PostgreSQL
- **Contenerización:** Docker
- **Control de versiones:** GitHub

## Bibliotecas y herramientas usadas
- React router
- Axios
- pg
- dotenv
- cors
- joi
- argon2
- react-router-dom

## Instalación y uso
### Prerrequisitos
- Node.js
- Docker y Docker compose
### Clonar el repositorio
```bash
git clone https://github.com/emiliocalvodemora/board-games-app
cd board-games-app
```

### Instalación del frontend
```bash
cd frontend
npm install
npm run dev
```

### Instalación del backend
```bash
cd backend
npm install
npm run start
```

### Usando Docker
```bash
docker compose build && docker compose up
```

## Variables de entorno requeridas
Para ejecutar el servidor, se deben definir unas variables de entorno en un archivo .env dentro de la carpeta backend/ :

PORT
DB_USER
DB_HOST
DB_NAME
DB_PASSWORD
DB_PORT
JWT_SECRET
NODE_ENV=development
CORS_ORIGIN
POSTGRES_HOST_AUTH_METHOD
POSTGRES_INITDB_ARGS

Y en el frontend/ :
VITE_API_URL

# Contribuciones
Este proyecto está desarrollado por Emilio Calvo de Mora Mármol como TFG.
