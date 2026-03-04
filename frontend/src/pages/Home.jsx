import React from 'react'
import { Link } from 'react-router-dom';
import PlayerHome from '../components/PlayerHome.jsx';
import AdminHome from '../components/AdminHome.jsx';

// Página de inicio que muestra diferentes vistas según el rol del usuario
const Home = ({user, error}) => {
  return (
    <div className="p-4">
      {error && <p className="auth-error">{error}</p>}
      {user ? (
        <>
          {user.role === "player" && <PlayerHome user={user} />}
          {user.role === "admin" && <AdminHome user={user} />}
        </>
      ) : (
        <div className="auth-container">
          <div className="auth-box">
            <h2 className="auth-title">Por favor, inicia sesión o regístrate</h2>
            <div className="auth-button-layout">
              <Link to="/login" className="auth-login-button">Iniciar sesión</Link>
              <Link to="/register" className="auth-register-button">Registrarse</Link>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
export default Home;
