import React from "react";

// Modal de confirmación genérico, utilizado para confirmar acciones como unirse o abandonar un evento
export default function ConfirmModal({ title, message, onConfirm, onCancel }) {
    return (
        <div className="modal-overlay">
            <div className="modal-container">
                <h2 className="modal-title">{title}</h2>
                <p className="mb-4">{message}</p>
                <div className="flex justify-end gap-4">
                <button
                    onClick={onCancel}
                    className="bg-gray-300 px-4 py-2 rounded"
                >
                    Cancelar
                </button>
                <button
                    onClick={onConfirm}
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                    Confirmar
                </button>
                </div>
            </div>
        </div>
    );
}