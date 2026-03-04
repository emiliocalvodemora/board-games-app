import React from "react";
import EventList from "./EventList.jsx";

export default function AdminHome({ user }) {

    
  return (
      <div className="flex flex-col md:flex-row min-h-[80vh] gap-6">
        <div className="flex-1 bg-white p-8 rounded-lg shadow-md text-center">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">¡Bienvenido a la página de administración, {user.name}!</h2>
            <p className="mt-4 text-gray-600">Aquí puedes crear y eliminar eventos para que los jugadores puedan participar en ellos.</p>
        </div>
        <EventList user={user} />
      </div>
  );
}