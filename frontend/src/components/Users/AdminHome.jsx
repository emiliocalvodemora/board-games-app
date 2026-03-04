import React from "react";
import EventList from "../Events/EventList.jsx";

export default function AdminHome({ user }) {

    
  return (
      <div className="users-container">
        <div className="users-box">
            <h2 className="users-welcome">¡Bienvenido a la página de administración, {user.name}!</h2>
            <p className="users-message">Aquí puedes crear y eliminar eventos para que los jugadores puedan participar en ellos.</p>
        </div>
        <EventList user={user} />
      </div>
  );
}