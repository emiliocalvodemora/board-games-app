import { useEffect, useState } from "react";
import axios from "axios";

// Componente que muestra la información de una partida, incluyendo el juego, los jugadores y la puntuación del usuario
export default function Match({ match, onClick, isJoinable }) {

  const [loading, setLoading] = useState(!match.id);
  const [error, setError] = useState(null);
  const [game, setGame] = useState(null);
  const [score, setScore] = useState(null);
  const [players, setPlayers] = useState([]);
  const isFull = isJoinable && players.length >= match.max_players;

  const fetchMatchResult = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/matchResults/${match.id}`);
      const matchResult = response.data.data;
      const playerScore = matchResult.find(result => result.player_id === matchResult[0].player_id)?.score;
      setScore(playerScore);
      const playerIds = matchResult.map(result => result.player_id);
      const usersResponses = await Promise.all(
        playerIds.map(id =>
          axios.get(
            `${import.meta.env.VITE_API_URL}/api/user/id/${id}`
          )
        )
      );
      const players = usersResponses.map(res => ({
        id: res.data.data.id,
        name: res.data.data.name
      }));
      setPlayers(players);
    } catch (err) {
      console.error('Error fetching match results:', err);
    }
  };
  

  const handleClick = () => {
    if (!isJoinable) return;

    if (isFull) {
      console.error('La partida está llena');
      return;
    }
    onClick(match);
  };


  useEffect(() => {
    fetchMatchResult();
  }, [match.id]);

  if (loading) return <p>Cargando partida...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <button className={`items-center text-center bg-white rounded-xl shadow-md p-4 hover:shadow-xl transition-shadow flex flex-col justify-between ${isJoinable ? 'cursor-pointer' : ''}`} onClick={handleClick}>
      <h2 className="text-xl font-bold mb-2 flex items-center gap-2">
        {isJoinable && <i className="fa-solid fa-arrow-right-to-bracket"></i>}
        {match.event_id ? `Partida del evento ${match.event_id}` : `Partida sin evento`}
      </h2>
      <p className="text-gray-600 mb-2 flex-grow">{match.game_name || 'Cargando juego...'}</p>
      <p className="text-gray-600 mb-2 flex-grow">Jugadores: {players.map(player => player.name).join(', ')}</p>
      <p className="text-gray-600 mb-2 flex-grow">Tu puntuación: {score !== null ? score : 'Cargando puntuación...'}</p>
      <p className="text-gray-600 mb-2 flex-grow">Hora de inicio: {new Date(match.start_time).toLocaleString()}</p>
      <p className="text-gray-600 mb-2 flex-grow">Hora de fin: {new Date(match.end_time).toLocaleString()}</p>
    </button>
  );
}
