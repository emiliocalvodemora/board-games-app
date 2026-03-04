import { useEffect, useState } from "react";
import axios from "axios";

export default function Event({ user, event, onJoin, onLeave, onDelete, isJoinable }) {

  const [error, setError] = useState(null);

  const handleClick = () => {
    if (user.role === 'admin') onDelete();
    if (user.role === 'player' && isJoinable && onJoin) onJoin();
    if (user.role === 'player' && !isJoinable && onLeave) onLeave();
  }

  if (error) return <p>Error: {error}</p>;
  if (!event) return <p>Evento no encontrado</p>;

  return (
    <button 
      className={`bg-white rounded-xl shadow-md p-4 mb-4 hover:shadow-lg transition-shadow cursor-pointer}`}
      onClick={handleClick}
    >
      <h3 className="text-lg font-bold mb-2 items-center">
        {isJoinable && <i className="fa-solid fa-arrow-right-to-bracket mr-2 text-blue-500"></i>}
        {!isJoinable && <i className="fa-solid fa-trash text-red-500 mr-2"></i>}
        {event.title}
      </h3>
      <p className="text-gray-600 mb-1">{event.description}</p>
      <p className="text-sm text-gray-500">{event.event_location}</p>
      <p className="text-sm text-gray-500">{new Date(event.event_date).toLocaleString()}</p>
    </button>
  );
}
