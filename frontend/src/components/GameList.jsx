import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import Game from './Game';

export default function GameList() {
    
    const [games, setGames] = useState([]);
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
  return (
    <ul className='main'>
    {
        games.map((game) => {
          
            console.log("e");
          return (
            <Game className="game" key={game.id} game={game} />
          )
        })
    }
    
    </ul>
  )
}
