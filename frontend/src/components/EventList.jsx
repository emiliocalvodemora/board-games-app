import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import Event from './Event.jsx';
import Sidebar from "./Sidebar.jsx";
import {useNavigate} from 'react-router-dom';

export default function EventList({ user }) {
    
  const [loading, setLoading] = useState(true); 
  const [eventParticipation, setEventParticipation] = useState([]);
  const [adminEvents, setAdminEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [error , setError] = useState("");

  const navigate = useNavigate();
  
  const crearEvento = () => {
      navigate('/create-event');
  }

  const handleJoin = async (eventId) => {
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/eventParticipation`, 
        {eventId: eventId, playerId: user.id, ranking: null}, 
        { withCredentials: true }
      );
      
      setEventParticipation(prev => [...prev, { event_id: eventId }]);
      setFilteredEvents(prev => prev.filter(e => e.id !== eventId));
    } catch (error) {
      console.error("Error al unirse al evento:", error);
      setError("Error al unirse al evento");
    }
  };

  const fetchEvents = async () => {
    if (user?.id && user.role === "player") {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/eventParticipation/${user.id}`, { withCredentials: true });
        setEventParticipation(response.data.data);

      }catch (error) {
        setError("Error fetching event data");
      }finally {
        setLoading(false);
      }
    } else if (user?.id && user.role === "admin") {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/event/admin/${user.id}`, { withCredentials: true });
        setAdminEvents(response.data.data);
      }catch (error) {
        setError("Error fetching event data");
      }finally {
        setLoading(false);
      }
    }
  };

  const fetchFilteredEvents = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/event`, { withCredentials: true });
      const filteredEventsTemp = response.data.data.filter(event => !eventParticipation.some(participation => participation.event_id === event.id));
      setFilteredEvents(filteredEventsTemp);
    } catch (error) {
      setError("Error filtering events");
    }
  };

  useEffect(() => { 
    if (user?.id) { 
      fetchEvents(); 
      fetchFilteredEvents(); 
    } 
  }, [user]);

  return (
    <Sidebar>

      <h1 className="text-2xl font-bold mb-4 text-gray-800">
        {user?.role === "player" ? "Listado de Eventos" : "Eventos creados"}
      </h1>
      
      {user?.role === "admin" && (
        <button 
          onClick={crearEvento} 
          className="bg-blue-500 text-white px-4 py-2 mb-4 rounded-md mt-4 font-medium">
          Crear Evento
        </button>
        )
      }

      {loading && <p>Cargando eventos...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {user?.role === "player" && eventParticipation.length > 0 && (
        <div className="flex items-center my-6">
          <hr className="flex-grow border-gray-300" />
          <span className="mx-4 text-gray-500 font-semibold">Eventos apuntados</span>
          <hr className="flex-grow border-gray-300" />
        </div>
      )}
      {user?.role === "player" && eventParticipation.map((event) => (
        <Event user={user} key={event.event_id} event={event} />
      ))}
      {user?.role === "player" && filteredEvents.length > 0 && (
        <div className="flex items-center my-6">
          <hr className="flex-grow border-gray-300" />
          <span className="mx-4 text-gray-500 font-semibold">Eventos disponibles</span>
          <hr className="flex-grow border-gray-300" />
        </div>
      )}
      {user?.role === "player" && filteredEvents.map((event) => (
        <Event onJoin={handleJoin} isJoinable={true} key={event.id} event={event} />
      ))}
      {user?.role === "admin" && adminEvents.map((event) => (
        <Event user={user} key={event.id} event={event} />
      ))}
    </Sidebar>
  )
}
