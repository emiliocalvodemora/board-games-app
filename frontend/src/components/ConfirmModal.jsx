import React from "react";

export default function ConfirmModal({ title, message, onConfirm, onCancel }) {
    return (
        <div className="fixed inset-0 bg-black/30 flex justify-center items-center z-50">
            <div className="bg-white rounded-xl p-6 w-96 shadow-xl relative">
                <h2 className="text-xl font-bold mb-4">{title}</h2>
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