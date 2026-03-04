import { useEffect, useState } from "react";
import axios from "axios";

export default function Game({ game: initialGame, gameId, onClick }) {

  const [game, setGame] = useState(initialGame || null);
  const [loading, setLoading] = useState(!initialGame);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (initialGame) {
      setGame(initialGame);
      setLoading(false);
      return;
    }
    if (gameId) {
      const fetchGame = async () => {
        try {
          const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/game/${gameId}`);
          setGame(response.data.data);
          setLoading(false);
        } catch (err) {
          setError(err.message);
          setLoading(false);
        }
      };
      fetchGame();
    }
  }, [gameId]);

  if (loading) return <p>Cargando juego...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!game) return <p>Juego no encontrado</p>;

  return (
    <button className="bg-white rounded-xl shadow-md p-4 hover:shadow-xl transition-shadow flex flex-col justify-between cursor-pointer" onClick={() => onClick(game)}>
      <h2 className="text-xl font-bold mb-2 flex items-center gap-2">
        <i className="fa-solid fa-trash-can text-gray-400 hover:text-red-500 cursor-pointer"></i>
        <i className="fa-solid fa-pen-to-square text-gray-400 hover:text-blue-500 cursor-pointer"></i>
        {game.name}
      </h2>
      <p className="text-gray-600 mb-2 flex-grow">{game.description}</p>
      <p className="text-sm text-gray-500 mt-2">
        {game.min_players} - {game.max_players} jugadores
      </p>
    </button>
  );
}
