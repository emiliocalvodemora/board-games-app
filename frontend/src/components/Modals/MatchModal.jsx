import { use, useState, useEffect  } from "react";
import { useMatch } from "../../hooks/useMatch.js";

//Modal que muestra un formulario para crear una nueva partida
export default function MatchModal({ user, game, onClose, onSubmit }) {
    const { events, loadingEvents, handleSubmitMatch } = useMatch(user.id);
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [selectedEvent, setSelectedEvent] = useState("");
    const [score, setScore] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        await handleSubmitMatch({
            gameId: game.id,
            eventId: selectedEvent === "" ? null : selectedEvent,
            startTime,
            endTime,
            score: score ? parseInt(score) : 0
        });
        onClose();
    };

    return (
    <div className="modal-overlay">
        <div className="modal-container">
        
        <h2 className="modal-title">
            Nueva partida de {game.name}
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <input
            type="text"
            value={game.name}
            disabled
            className="border p-2 rounded bg-gray-100"
            />

            <select
            value={selectedEvent}
            onChange={(e) => setSelectedEvent(e.target.value)}
            className="border p-2 rounded"
            required
            >
            <option value={null}>Selecciona un evento (opcional)</option>
            {events.map((event) => (
                <option key={event.id} value={event.id}>
                {event.title}
                </option>
            ))}
            </select>

            <input
            type="datetime-local"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            className="border p-2 rounded"
            required
            />

            <input
            type="datetime-local"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            className="border p-2 rounded"
            required
            />

            <input
            type="number"
            value={score}
            onChange={(e) => setScore(e.target.value)}
            className="border p-2 rounded"
            placeholder="Introduce tu puntuación"
            required
            />

            <div className="flex justify-between mt-4">
            <button
                type="button"
                onClick={onClose}
                className="bg-gray-300 px-4 py-2 rounded"
            >
                Cancelar
            </button>

            <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded"
            >
                Crear
            </button>
            </div>
        </form>
        </div>
    </div>
  );
}