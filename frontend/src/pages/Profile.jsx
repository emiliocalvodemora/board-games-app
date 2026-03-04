import React from 'react'
import { Link } from 'react-router-dom';

// Página de perfil que muestra la información del usuario, solo disponible si se ha iniciado sesión
const Profile = ({user, error}) => {
  return (
    <div className='profile-container'>
      <div className='profile-container-inner'>
        {error && <p className="profile-error">{error}</p>}
        {user ? (
          <div>
            <h2 className='profile-welcome'>Esta es la zona de perfil de {user.name}</h2>
            <p>Email: {user.email}</p>
            <p>Rol: {user.role}</p>
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
