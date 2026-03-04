import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import {BrowserRouter as Router, Routes, Route, Navigate, Link} from 'react-router-dom';
import axios from 'axios';
import Home from './pages/Home.jsx';
import Register from './pages/Register.jsx';
import Login from './pages/Login.jsx';
import Admin from "./components/Admin.jsx";
import Game from './components/Game.jsx';
import GameList from './components/GameList.jsx';
import GameForm from './components/GameForm.jsx';
import NotFound from './components/NotFound.jsx';
import NavBar from './components/NavBar.jsx';
import Profile from './pages/Profile.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import {useFetchMe} from './hooks/useFetchMe.js';

axios.defaults.withCredentials = true;

function App() {
  const [user, setUser] = useFetchMe();
  const [count, setCount] = useState(0)
  const [array, setArray] = useState([]);
  const [loading, setLoading] = useState(true); 
  const [responseMessage, setResponseMessage] = useState('');
  const [error , setError] = useState("");

  const fetchMe = async () => {
    try {
      const me = await axios.get(`${import.meta.env.VITE_API_URL}/api/auth/me`, { withCredentials: true });

      setUser(me.data.data);

    }catch (error) {
      setUser(null);
      // setError("Error fetching user data");
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

  function handleAddGames(newGame) {
    const newGameList = [...array, newGame];
    setArray(newGameList);
  }

  // const fetchAPI = async () => {
  //   try {
  //     const response = await axios.get('http://localhost:5001/api/admin');
  //     const data = response.data;
  //     console.log(data);
  //     setArray(data.data);
  //   } catch (error) {
  //     console.error('Error fetching data:', error);
  //   }
  // };

  // const sendMessage = async () => {
  //   try {
  //     const response = await axios.post('http://localhost:5001/api/admin', {
  //       name: 'John Doe',
  //       email: 'email@email.com',
  //       password: 'password123'
  //     });
  //     console.log('Message sent successfully:', response.data);
  //     setResponseMessage('Message sent successfully!');
  //   } catch (error) {
  //     console.error('Error sending message:', error);
  //     setResponseMessage('Error sending message.');
  //   }
  // };
  // useEffect(() => {
  //   fetchAPI();
  // }, []);
  return (
    <Router>
      <NavBar user = {user} setUser={setUser} />
      <Routes>
        <Route path="/" element={<Home error={error} user={user}/>} />
        <Route path="/register" element={user ? <Navigate to="/" /> : <Register setUser={setUser}/>} />
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login setUser={setUser} />} />
        <Route path="/profile" element={<Profile user={user} error={error} />} />
        <Route path="/game/:id" element={<Game />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      {/* <main>
        <Admin>

        </Admin>


      </main>
      <div> <GameList/></div>

      <br />  
      <div>
        <GameForm handleAddGames={handleAddGames} />
        <Game gameId={2} />
      </div> */}
      {/* <div>
        <button onClick={sendMessage}>HACER ADMIN</button>
        <p>{responseMessage}</p>
        {
          array.map((item) => (
            <div key={item.id}>
              <h2>{item.name}</h2>
              <p>{item.email}</p>
              <br />
            </div>
          ))
        }
      </div> */}
    </Router>
  )
}

export default App
