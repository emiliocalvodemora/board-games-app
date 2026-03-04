import React, { useState } from 'react';
import axios from 'axios';

export default function CreateEventModal({ user, onClose, onCreated }) {
    const [form, setForm] = useState({
        title: '',
        description: '',
        event_date: '',
        event_location: '',
        organizer_admin_id: user?.id || '',
    });

    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
        const response = await axios.post(
            `${import.meta.env.VITE_API_URL}/api/event`,
            form,
            { withCredentials: true }
        );
        if (onCreated) onCreated(response.data.data);
        onClose();
        } catch (err) {
        console.error('Error registrando evento:', err);
        setError("Registro de evento fallido");
        }
    };

    return (
        <div className="fixed inset-0 bg-black/30 bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-xl w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Crear Evento</h2>
            {error && <p className="text-red-500 mb-2">{error}</p>}
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <input 
                type="text" 
                placeholder="Título" 
                className="border rounded px-3 py-2"
                value={form.title}
                onChange={(e) => setForm({...form, title: e.target.value})} />
            <input 
                type="text" 
                placeholder="Descripción" 
                className="border rounded px-3 py-2"
                value={form.description}
                onChange={(e) => setForm({...form, description: e.target.value})} />
            <input 
                type="datetime-local" 
                placeholder="Fecha del evento" 
                className="border rounded px-3 py-2"
                value={form.event_date}
                onChange={(e) => setForm({...form, event_date: e.target.value})} />
            <input 
                type="text" 
                placeholder="Ubicación del evento" 
                className="border rounded px-3 py-2"
                value={form.event_location}
                onChange={(e) => setForm({...form, event_location: e.target.value})} />
            <div className="flex justify-end gap-2 mt-4">
                <button type="button" onClick={onClose} className="px-4 py-2 border rounded">Cancelar</button>
                <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">Crear</button>
            </div>
            </form>
        </div>
        </div>
    );
}