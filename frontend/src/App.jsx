import { useState, useEffect } from 'react'
import {BrowserRouter as Router, Routes, Route, Navigate, Link} from 'react-router-dom';
import axios from 'axios';
import Home from './pages/Home.jsx';
import Register from './pages/Register.jsx';
import Login from './pages/Login.jsx';
import NavBar from './components/Layout/NavBar.jsx';
import Profile from './pages/Profile.jsx';
import NotFound from './pages/NotFound.jsx';

axios.defaults.withCredentials = true;

function App() {
  const [user, setUser] = useState();
  const [array, setArray] = useState([]);
  const [loading, setLoading] = useState(true); 
  const [error , setError] = useState("");

  // Función para verificar el token de sesión  y obtener el usuario
  const fetchMe = async () => {
    try {
      const me = await axios.get(`${import.meta.env.VITE_API_URL}/api/auth/me`, { withCredentials: true });
      setUser(me.data.data);
    }catch (error) {
      setUser(null);
    }finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchMe();  
  }, []); 

  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    // Rutas de la aplicación
    <Router>
      <NavBar user = {user} setUser={setUser} />
      <Routes>
        <Route path="/" element={<Home error={error} user={user}/>} />
        <Route path="/register" element={user ? <Navigate to="/" /> : <Register setUser={setUser}/>} />
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login setUser={setUser} />} />
        <Route path="/profile" element={<Profile user={user} error={error} />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  )
}

export default App
