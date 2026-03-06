import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import Match from './Match';
import JoinMatchModal from '../Modals/JoinMatchModal.jsx';

// Componente que lista las partidas registradas por el usuario y las disponibles para unirse
// También permite al usuario unirse a una partida existente a través de un modal
export default function MatchList({ user }) {
    const [loading, setLoading] = useState(true); 
    const [myMatches, setMyMatches] = useState([]);
    const [otherMatches, setOtherMatches] = useState([]);
    const [selectedMatch, setSelectedMatch] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const fetchMyMatches = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/my-matches`, { withCredentials: true }); 
            const data = response.data.data;
            setMyMatches(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }finally {
            setLoading(false);
        }
    };

    const fetchOtherMatches = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/other-matches`, { withCredentials: true });
            const data = response.data.data;
            setOtherMatches(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchMyMatches();
        fetchOtherMatches();
    }, []);

    const openModal = (match) => {
        setSelectedMatch(match);
        setShowModal(true);
    };

    const closeModal = () => {
        setSelectedMatch(null);
        setShowModal(false);
    };

    const handleSubmitJoinMatch = async (matchData) => {
        try {
            console.log('Datos enviados para unirse a la partida:', matchData);
        await axios.post(`${import.meta.env.VITE_API_URL}/api/matchResult`, 
            { matchId: matchData.matchId, playerId: matchData.playerId, score: matchData.score },
            { withCredentials: true }
        );
        fetchOtherMatches();    
        fetchMyMatches();
        
        closeModal();
        } catch (error) {
        console.error('Error submitting match:', error);
        }
    };

    return (
        <div className="p-6">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Partidas registradas</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {myMatches.length === 0 ? (
                <p className="text-gray-600 items-center">No tienes partidas registradas.</p>
            ) : (
                myMatches.map((match) => (
                <Match key={match.id} match={match} onClick={openModal} />
                ))
            )}
        </div>
        
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Partidas disponibles</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {otherMatches.map((match) => (
            <Match key={match.id} match={match} onClick={openModal} isJoinable={true} />
            ))}
        </div>

        {showModal && selectedMatch && (
            <JoinMatchModal
                user={user}
                match={selectedMatch}
                onClose={closeModal}
                onSubmit={handleSubmitJoinMatch}
            />
        )}
        </div>
    )
}
