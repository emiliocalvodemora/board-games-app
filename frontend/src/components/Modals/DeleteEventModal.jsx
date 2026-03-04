import React, { useState } from 'react';
import axios from 'axios';

// Modal de confirmación para borrar un evento, solo accesible para el admin del evento
export default function DeleteEventModal({ user, event, onClose, onDeleted }) {
  const [error, setError] = useState("");

  const handleDelete = async () => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/event/${event.id}`,
        { withCredentials: true }
      );
      if (onDeleted) onDeleted(event.id);
      onClose();
    } catch (err) {
      console.error("Error borrando el evento:", err);
      setError("No se pudo borrar el evento");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <h2 className="modal-title">Borrar Evento</h2>
        {error && <p className="auth-error">{error}</p>}
        <p className="mb-4">¿Estás seguro de que quieres borrar el evento "{event.title}"?</p>
        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 border rounded">Cancelar</button>
          <button onClick={handleDelete} className="px-4 py-2 bg-red-500 text-white rounded">Borrar</button>
        </div>
      </div>
    </div>
  );
}