import React from 'react'
import {useNavigate} from 'react-router-dom';
import axios from 'axios';

const EventForm = ({ user }) => {
  const [form, setForm] = React.useState({
    title: '',
    description: '',
    event_date: '',
    event_location: '',
    organizer_admin_id: user?.id || '',
  });

const [error, setError] = React.useState("");
const navigate = useNavigate();

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/event`, form);
    navigate('/');
  } catch (error) {
    console.error('Error registrando evento:', error);
    setError("Registro de evento fallido");
  }
};

  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit} className="auth-form">
        <h2 className='auth-form-title'>Crear Evento</h2>
        {error && <p className="auth-error">{error}</p>}
        <input 
          type="text" 
          placeholder="Título" 
          className='auth-input' 
          value={form.title} 
          onChange={(e) => setForm({...form, title: e.target.value})} />
        <input 
          type="text" 
          placeholder="Descripción" 
          className='auth-input' 
          value={form.description} 
          onChange={(e) => setForm({...form, description: e.target.value})} />
        <input 
          type="date" 
          placeholder="Fecha del evento" 
          className='auth-input' 
          value={form.event_date} 
          onChange={(e) => setForm({...form, event_date: e.target.value})} />
        <input 
          type="text" 
          placeholder="Ubicación del evento" 
          className='auth-input' 
          value={form.event_location} 
          onChange={(e) => setForm({...form, event_location: e.target.value})} />
        <button type="submit" className="auth-button">Crear Evento</button>
      </form>
    </div>
  )
}
export default EventForm;