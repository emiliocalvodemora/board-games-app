import { useEffect, useState } from "react";
import axios from "axios";

export default function Game({ game: initialGame, gameId }) {

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
    <div>
      <h2><i className="fa-solid fa-trash-can"></i><i className="fa-solid fa-pen-to-square"></i>{game.name}</h2>
      <p>{game.description}</p>
      <p>
        {game.min_players} - {game.max_players} jugadores
      </p>
    </div>
  );
}
