import React from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';

// Página de perfil que muestra la información del usuario, solo disponible si se ha iniciado sesión
const Profile = ({user, setUser, error, setError}) => {
  const [message, setMessage] = React.useState("");
  
  const [form, setForm] = React.useState({
    name: '',
    email: '',
    password: '',
  });  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`${import.meta.env.VITE_API_URL}/api/user/${user.id}`, form);
      setUser(response.data.data);

      setMessage("Datos actualizados correctamente");
      setError("");
      
    } catch (error) {
      console.error('Error actualizando perfil:', error);
      setError("Error al actualizar el perfil.");
    }
  };

  return (
    <div className='profile-container'>
      <div className='profile-container-inner'>
        {message && <p className="profile-message">{message}</p>}
        {user ? (
          <div>
            <h2 className='profile-welcome'>Esta es la zona de perfil de {user.name}</h2>
            <p>Email: {user.email}</p>
            <p>Rol: {user.role}</p>
            
            <form onSubmit={handleSubmit} className="auth-form">

              <h2 className="auth-form-title">Actualizar perfil</h2>

              {message && <p className="auth-success">{message}</p>}
              {error && <p className="auth-error">{error}</p>}

              <input
                type="text"
                placeholder="Nombre"
                className="auth-input"
                value={form.name}
                onChange={(e) =>
                  setForm({ ...form, name: e.target.value })
                }
              />

              <input
                type="email"
                placeholder="Email"
                className="auth-input"
                value={form.email}
                onChange={(e) =>
                  setForm({ ...form, email: e.target.value })
                }
              />

              <input
                type="password"
                placeholder="Nueva contraseña"
                className="auth-input"
                value={form.password}
                onChange={(e) =>
                  setForm({ ...form, password: e.target.value })
                }
              />

              <button type="submit" className="auth-button">
                Guardar cambios
              </button>

            </form>
          </div>
          ) : (
            <div>
              <h2 className='profile-welcome'>Por favor, inicia sesión o regístrate</h2>
              <div className='profile-auth'>
                <Link to="/login" className="profile-login">Iniciar sesión</Link>
                <Link to="/register" className="profile-register">Registrarse</Link>
              </div>
            </div>
          )
        }
      </div>
    </div>
  )
}
export default Profile;
