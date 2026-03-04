import axios from "axios";

// Servicio para manejar la creación de una partida
export const createMatch = async (matchData, userId) => {
    const {score, ...matchInfo} = matchData;
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/match`, matchInfo, { withCredentials: true });

    const createMatchId = response.data.data.id;

    await axios.post(`${import.meta.env.VITE_API_URL}/api/matchResult`,
        { matchId: createMatchId, playerId: userId, score: parseInt(score) },
        { withCredentials: true }
    );
    return response.data.data;
}

//Servicio para obtener los eventos a los que el usuario se ha unido
export const fetchUserEvents = async (userId) => {
    try {
        const response = await axios.get(
            `${import.meta.env.VITE_API_URL}/api/my-events`,
            { withCredentials: true }
        );
        return response.data.data;
    } catch (error) {
        console.error("Error cargando eventos:", error);
        return [];
    }
}; 