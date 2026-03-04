import React from "react";
import EventList from "./EventList.jsx";
import GameList from "./GameList.jsx";
import MatchList from "./MatchList.jsx";

export default function PlayerHome({ user }) {
  return (
    <div className="flex flex-col md:flex-row min-h-[80vh] gap-6">

        <div className="flex-1 bg-white p-8 rounded-lg shadow-md text-center">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Welcome, {user.name}!</h2>
            <p className="mt-4 text-gray-600">En esta página puedes ver tus eventos y partidas, así como gestionar tu participación en ellos.</p>
            <MatchList user={user} />
            <GameList user={user} />
        </div>
        {user?.role === "player" && (
            <EventList user={user} />
        )}
    </div>
  );
}