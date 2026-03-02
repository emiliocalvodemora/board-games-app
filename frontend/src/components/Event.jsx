import { useEffect, useState } from "react";
import axios from "axios";

export default function Event({ event }) {

  const [eventData, setEvent] = useState(event);
  const [loading, setLoading] = useState(!event);
  const [error, setError] = useState(null);

  const fetchEvent = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/event/${event.event_id}`, { withCredentials: true });
      setEvent(response.data.data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (event) {
      setEvent(event);
      setLoading(false);
      fetchEvent();
    }
  }, [event?.event_id]);

  if (loading) return <p>Cargando evento...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!event) return <p>Evento no encontrado</p>;

  return (
    <div className="bg-white rounded-xl shadow-md p-4 mb-4 hover:shadow-lg transition-shadow">
      <h3 className="text-lg font-bold mb-2"><i className="fa-solid fa-trash-can"></i><i className="fa-solid fa-pen-to-square"></i>{eventData.title}</h3>
      <p className="text-gray-600 mb-1">{eventData.description}</p>
      <p className="text-sm text-gray-500">{eventData.event_location}</p>
      <p className="text-sm text-gray-500">{new Date(eventData.event_date).toLocaleString()}</p>
    </div>
  );
}
