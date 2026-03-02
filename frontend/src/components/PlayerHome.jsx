import React from "react";
import EventList from "./EventList.jsx";

export default function PlayerHome({ user }) {
  return (
    <div className="flex flex-col md:flex-row min-h-[80vh] gap-6">

        <div className="flex-1 bg-white p-8 rounded-lg shadow-md text-center">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Welcome, {user.name}!</h2>
            <p>Email: {user.email}</p>
            <p>Role: {user.role}</p>
            <p className="mt-4 text-gray-600">Aquí puedes ver tus eventos y gestionar tu participación.</p>
        </div>
        {user?.role === "player" && (
            <EventList user={user} />
        )}
    </div>
  );
}