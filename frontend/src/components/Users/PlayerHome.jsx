import React from "react";
import EventList from "../Events/EventList.jsx";
import GameList from "../Games/GameList.jsx";
import MatchList from "../Matches/MatchList.jsx";

export default function PlayerHome({ user }) {
  return (
    <div className="users-container">

        <div className="users-box">
            <h2 className="users-welcome">¡Bienvenido, {user.name}!</h2>
            <p className="users-message">En esta página puedes ver tus eventos y partidas, así como gestionar tu participación en ellos.</p>
            <MatchList user={user} />
            <GameList user={user} />
        </div>
        {user?.role === "player" && (
            <EventList user={user} />
        )}
    </div>
  );
}