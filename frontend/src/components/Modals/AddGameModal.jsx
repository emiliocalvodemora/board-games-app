import { useState } from "react";

// Modal para añadir un nuevo juego
export default function AddGameModal({ onClose, onSubmit }) {

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [minPlayers, setMinPlayers] = useState("");
    const [maxPlayers, setMaxPlayers] = useState("");
    

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({
        name,
        description,
        minPlayers: parseInt(minPlayers),
        maxPlayers: parseInt(maxPlayers)
        });
    };

    return (
        <div className="modal-overlay">
        <div className="modal-container">
            <h2 className="modal-title">
            Añadir nuevo juego
            </h2>

            <form onSubmit={handleSubmit} className="flex flex-col gap-3">

            <input
                type="text"
                name="name"
                placeholder="Nombre"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border p-2 rounded"
                required
            />

            <textarea
                name="description"
                placeholder="Descripción"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="border p-2 rounded"
                required
            />

            <input
                type="number"
                name="minPlayers"
                placeholder="Mínimo jugadores"
                value={minPlayers}
                onChange={(e) => setMinPlayers(e.target.value)}
                className="border p-2 rounded"
                required
            />

            <input
                type="number"
                name="maxPlayers"
                placeholder="Máximo jugadores"
                value={maxPlayers}
                onChange={(e) => setMaxPlayers(e.target.value)}
                className="border p-2 rounded"
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
                className="bg-green-600 text-white px-4 py-2 rounded"
                >
                Crear
                </button>
            </div>
            </form>
        </div>
        </div>
    );
}