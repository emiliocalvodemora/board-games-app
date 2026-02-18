import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios';
import Admin from "./components/Admin.jsx";
import Game from './components/Game.jsx';
import GameList from './components/GameList.jsx';
import GameInput from './components/GameInput';

function App() {
  const [count, setCount] = useState(0)
  const [array, setArray] = useState([]);
  const [responseMessage, setResponseMessage] = useState('');

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
    <>
      <main>
        <Admin>

        </Admin>


      </main>
      <div> <GameList/></div>

      <br />  
      <div>
        <GameInput handleAddGames={handleAddGames} />
        <Game gameId={2} />
      </div>
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
    </>
  )
}

export default App
