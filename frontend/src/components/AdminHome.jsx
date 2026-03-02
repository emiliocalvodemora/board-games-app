import React from "react";

export default function AdminHome({ user }) {
  return (
    <div className="min-h-[80vh] bg-white p-8 rounded-lg shadow-md text-center">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Admin Panel</h2>
      <p>Welcome, {user.name}!</p>
      <p>Email: {user.email}</p>
      <p>Role: {user.role}</p>
      <p className="mt-4 text-gray-600">Aquí podrás gestionar eventos, usuarios y estadísticas.</p>
      
      <div className="mt-6 border-2 border-dashed border-gray-300 p-4 rounded-lg">
        <p>Contenido de admin pendiente de implementación.</p>
      </div>
    </div>
  );
}