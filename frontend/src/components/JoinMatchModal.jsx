import { useState } from "react";

export default function JoinMatchModal({ user, match, onClose, onSubmit }) {
    const [score, setScore] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Envía solo los datos necesarios para apuntarse
        await onSubmit({
            matchId: match.id,
            playerId: user.id,
            score: score ? parseInt(score) : 0,
        });
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/30 flex justify-center items-center z-50">
            <div className="bg-white rounded-xl p-6 w-96 shadow-xl relative">
                <h2 className="text-xl font-bold mb-4">
                    Apuntarse a la partida
                </h2>

                <p className="mb-2"><strong>Juego:</strong> {match.game_name || 'Cargando...'}</p>
                <p className="mb-2"><strong>Evento:</strong> {match.event_id ? `Evento ${match.event_id}` : 'Sin evento'}</p>
                <p className="mb-2"><strong>Inicio:</strong> {new Date(match.start_time).toLocaleString()}</p>
                <p className="mb-4"><strong>Fin:</strong> {new Date(match.end_time).toLocaleString()}</p>

                <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                    <input
                        type="number"
                        value={score}
                        onChange={(e) => setScore(e.target.value)}
                        className="border p-2 rounded"
                        placeholder="Introduce tu puntuación (opcional)"
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
                        Apuntarse
                        </button>
                    </div>
                </form>
            </div>
        </div>
  );
}