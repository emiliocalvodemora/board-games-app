import React from 'react'
import {useNavigate} from 'react-router-dom';
import axios from 'axios';

// Página de registro
const Register = ({ setUser }) => {
  const [form, setForm] = React.useState({
    name: '',
    email: '',
    password: '',
    role: 'player',
  });

  const [error, setError] = React.useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/register`, form);
      navigate('/login');
    } catch (error) {
      console.error('Error registrando:', error);
      setError("Registro fallido");
    }
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit} className="auth-form">
        <h2 className='auth-form-title'>Registro</h2>
        {error && <p className="auth-error">{error}</p>}
        <input 
          type="text" 
          placeholder="nombre" 
          className='auth-input' 
          value={form.name} 
          onChange={(e) => setForm({...form, name: e.target.value})} />
        <input 
          type="email" 
          placeholder="email" 
          className='auth-input' 
          value={form.email} 
          onChange={(e) => setForm({...form, email: e.target.value})} />
        <input 
          type="password" 
          placeholder="contraseña" 
          className='auth-input' 
          value={form.password} 
          onChange={(e) => setForm({...form, password: e.target.value})} />
        <select 
          type="role" 
          placeholder="Rol" 
          className='auth-input' 
          value={form.role} 
          onChange={(e) => setForm({...form, role: e.target.value})}> 
          <option value="">Selecciona rol</option>
          <option value="player">Jugador</option>
          <option value="admin">Admin</option>  
        </select>
        <button type="submit" className="auth-button">Registrarse</button>
      </form>
    </div>
  )
}
export default Register;