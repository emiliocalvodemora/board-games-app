import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import Event from './Event.jsx';
import Sidebar from "./Sidebar.jsx";
import ConfirmModal from './ConfirmModal.jsx';
import CreateEventModal from './CreateEventModal.jsx';
import DeleteEventModal from './DeleteEventModal.jsx';

export default function EventList({ user }) {
    
  const [loading, setLoading] = useState(true); 
  const [myEvents, setMyEvents] = useState([]);
  const [adminEvents, setAdminEvents] = useState([]);
  const [otherEvents, setOtherEvents] = useState([]);
  const [error , setError] = useState("");
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [modalType, setModalType] = useState("join");
  const [showCreateEventModal, setShowCreateEventModal] = useState(false);
  const [showDeleteEventModal, setShowDeleteEventModal] = useState(false);  
  
  const crearEvento = () => {
    setShowCreateEventModal(true);
  }

  const handleJoinClick = (event) => {
    setSelectedEvent(event);
    setModalType("join");
    setShowConfirmModal(true);
  };

  const handleLeaveClick = (event) => {
    setSelectedEvent(event);
    setModalType("leave");
    setShowConfirmModal(true);
  };

  const handleDeleteClick = async (event) => {
    if (!event) return;
    setSelectedEvent(event);
    setModalType("delete");
    setShowDeleteEventModal(true);
  };

  const handleCancelModal = () => {
    setSelectedEvent(null);
    setShowConfirmModal(false);
    setShowDeleteEventModal(false);
  };

  const handleConfirmJoin = async () => {
    if (!selectedEvent) return;

    try {
      if (modalType === "join") {
        await axios.post(
          `${import.meta.env.VITE_API_URL}/api/eventParticipation`,
          { eventId: selectedEvent.id, playerId: user.id, ranking: null },
          { withCredentials: true }
        );
        fetchEvents();
        fetchOtherEvents();
      } else if (modalType === "leave") {
        console.log("Intentando salir del evento con ID:", selectedEvent.id);
        console.log("User ID:", user.id);
        await axios.delete(
          `${import.meta.env.VITE_API_URL}/api/eventParticipation/${selectedEvent.id}/${user.id}`,
          { withCredentials: true }
        );
        fetchEvents();
        fetchOtherEvents();
      }
    } catch (error) {
      console.error("Error al unirse al evento:", error);
      setError("Error al unirse al evento");
    } finally {
      setSelectedEvent(null);
      setShowConfirmModal(false);
      setShowDeleteEventModal(false);
    }
  };


  const fetchEvents = async () => {
    if (user?.id && user.role === "player") {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/my-events`, { withCredentials: true });
        setMyEvents(response.data.data);
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

  const fetchOtherEvents = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/other-events`, { withCredentials: true });
      setOtherEvents(response.data.data);
    } catch (error) {
      setError("Error filtering events");
    }
  };

  useEffect(() => { 
    if (user?.id) { 
      fetchEvents(); 
      fetchOtherEvents(); 
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
      {user?.role === "player" && myEvents.length > 0 && (
        <div className="flex items-center my-6">
          <hr className="flex-grow border-gray-300" />
          <span className="mx-4 text-gray-500 font-semibold">Eventos apuntados</span>
          <hr className="flex-grow border-gray-300" />
        </div>
      )}
      {user?.role === "player" && myEvents.map((event) => (
        <Event onLeave={() => handleLeaveClick(event)} isJoinable={false} user={user} key={event.id} event={event}/>
      ))}
      {user?.role === "player" && otherEvents.length > 0 && (
        <div className="flex items-center my-6">
          <hr className="flex-grow border-gray-300" />
          <span className="mx-4 text-gray-500 font-semibold">Eventos disponibles</span>
          <hr className="flex-grow border-gray-300" />
        </div>
      )}
      {user?.role === "player" && otherEvents.map((event) => (
        <Event onJoin={() => handleJoinClick(event)} isJoinable={true} user={user} key={event.id} event={event} />
      ))}
      {user?.role === "admin" && adminEvents.map((event) => (
        <Event onDelete={() => handleDeleteClick(event)} user={user} key={event.id} event={event} />
      ))}
      {showCreateEventModal && (
        <CreateEventModal 
          user={user} 
          onClose={() => setShowCreateEventModal(false)} 
          onCreated={() => {
            fetchEvents();
            fetchOtherEvents();
            setShowCreateEventModal(false);
          }} 
        />
      )}
      {showConfirmModal && selectedEvent && (
        <ConfirmModal
          title="Confirmar participación"
          message={`¿Quieres ${modalType === "join" ? "unirte al" : "abandonar el"} evento "${selectedEvent.title}"?`}
          onConfirm={handleConfirmJoin}
          onCancel={handleCancelModal}
        />
      )}
      {showDeleteEventModal && (
        <DeleteEventModal 
          user={user} 
          event={selectedEvent}
          onClose={() => {
            setShowDeleteEventModal(false)
            setSelectedEvent(null);}} 
          onDeleted={() => {
            fetchEvents();
            fetchOtherEvents();
            setSelectedEvent(null);
            setShowDeleteEventModal(false);
          }} 
        />
      )}
    </Sidebar>
  )
}
