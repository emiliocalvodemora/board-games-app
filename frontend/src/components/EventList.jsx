import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import Event from './Event.jsx';
import Sidebar from "./Sidebar.jsx";

export default function EventList({ user }) {
    
  const [loading, setLoading] = useState(true); 
  const [eventParticipation, setEventParticipation] = useState([]);
  const [error , setError] = useState("");

  const fetchEvents = async () => {
    if (user?.id && user.role === "player") {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/eventParticipation/${user.id}`, { withCredentials: true });
        setEventParticipation(response.data.data);
        console.log(response.data.data);

      }catch (error) {
        setError("Error fetching event data");
      }finally {
        setLoading(false);
      }
    }
  };
  useEffect(() => {
    if (user?.id) {
      fetchEvents();  
    }
  }, [user]);
  return (
    <Sidebar>
      {eventParticipation.length === 0 && <p>No tienes eventos disponibles</p>}
      {eventParticipation.map((event) => (
        <Event key={event.event_id} event={event} />
      ))}
    </Sidebar>
    // <ul className='main'>
    // {
    //     eventParticipation.map((event) => {
    //       return (
    //         <Event className="event" key={event.event_id} event={event} />
    //       )
    //     })
    // }
    
    // </ul>
  )
}
