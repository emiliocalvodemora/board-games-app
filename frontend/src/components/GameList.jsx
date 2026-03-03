import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import Game from './Game';
import MatchModal from './MatchModal.jsx';

export default function GameList({ user }) {
  const [games, setGames] = useState([]);
  const [selectedGame, setSelectedGame] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const fetchAPI = async () => {
      try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/game`);
      const data = response.data;
      setGames(data.data);
      } catch (error) {
      console.error('Error fetching data:', error);
      }
  };
  useEffect(() => {
      fetchAPI();
    }, []);

  const openModal = (game) => {
    setSelectedGame(game);
    setShowModal(true);
  };

  const closeModal = () => {
    setSelectedGame(null);
    setShowModal(false);
  };

  const handleSubmitMatch = async (matchData) => {
    try {
      const {score, ...matchInfo} = matchData;
      const response =await axios.post(`${import.meta.env.VITE_API_URL}/api/match`, matchInfo);
      await axios.post(`${import.meta.env.VITE_API_URL}/api/matchResult`, 
        { matchId: response.data.data.id, playerId: user.id, score: score },
        { withCredentials: true }
      );
      closeModal();
    } catch (error) {
      console.error('Error submitting match:', error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Juegos disponibles</h1>
      <p className="font-bold mb-6 text-gray-800">Selecciona un juego para registrar una partida</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {games.map((game) => (
          <Game key={game.id} game={game} onClick={openModal} />
        ))}
      </div>

      {showModal && selectedGame && (
        <MatchModal
          user={user}
          game={selectedGame}
          onClose={closeModal}
          onSubmit={handleSubmitMatch}
        />
      )}
    </div>
  )
}
