import React from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect } from 'react'
import EventList from '../components/EventList.jsx';
import PlayerHome from '../components/PlayerHome.jsx';
import AdminHome from '../components/AdminHome.jsx';


const Home = ({user, error}) => {
  
  const [loading, setLoading] = useState(true); 
  
  const temporal = async () => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/eventParticipation`, 
      {
        "eventId": "1",
        "playerId": "7",
        "ranking": 1
      },  
      
      { withCredentials: true });
      const response2 = await axios.post(`${import.meta.env.VITE_API_URL}/api/eventParticipation`, 
      {
        "eventId": "2",
        "playerId": "7",
        "ranking": 1
      },  
      
      { withCredentials: true });
    }
    catch (error) {
      console.error('Error fetching user data:', error);
    }
  };


  return (
    <div className="p-4">
      {error && <p className="text-red-500 mb-4">{error}</p>}

      {user ? (
        <>
          {user.role === "player" && <PlayerHome user={user} />}
          {user.role === "admin" && <AdminHome user={user} />}
          {user.role !== "player" && user.role !== "admin" && (
            <p className="text-gray-600">Rol no reconocido.</p>
          )}
        </>
      ) : (
        <div className="min-h-[80vh] flex flex-col items-center justify-center gap-6">
          <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg text-center">
            <h2 className="text-2xl font-bold text-gray-800">Please log in or register</h2>
            <div className="flex flex-col gap-y-4">
              <Link to="/login" className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4 font-medium">Login</Link>
              <Link to="/register" className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md mt-4 font-medium">Register</Link>
            </div>
          </div>
        </div>
      )}
    </div>
    
    // <div className='min-h-[80vh] flex flex-col md:flex-row items-start justify-start p-4 gap-6'>
      
    //   {user?.role === "player" && (
    //     <EventList user={user} />
    //   )}

    //   <div className='flex-1 bg-white p-8 rounded-lg shadow-md text-center'>
    //     <button onClick={temporal} className="bg-blue-500 text-white px-4 py-2 rounded-md mb-4">Temporal</button>
    //     {error && <p className="text-red-500 mb-4">{error}</p>}
    //     {user ? (
    //       <div>
    //         <h2 className='text-2xl font-bold mb-4 text-gray-800'>Welcome, {user.name}!</h2>
    //         <p>Email: {user.email}</p>
    //         <p>Role: {user.role}</p>
    //         {user?.role !== "player" && <p className="text-gray-600">You are not authorized to view the events.</p>}
    //       </div>
    //     ) : (
    //       <div>
    //         <h2 className='text-2xl font-bold mb-6 text-gray-800'>Please log in or register</h2>
    //         <div className='flex flex-col gap-y-4'>
    //           <Link to="/login" className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4 font-medium">Login</Link>
    //           <Link to="/register" className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md mt-4 font-medium">Register</Link>
    //         </div>
    //       </div>
    //     )}
    //   </div>
    // </div>

    // <div className='min-h-[80vh] flex items-center justify-center p-4'>
    //   <div className='bg-white p-8 rounded-lg shadow-md w-full max-w-lg text-center'>
    //     <button onClick={temporal} className="bg-blue-500 text-white px-4 py-2 rounded-md mb-4">Temporal</button>
    //     {error && <p className="text-red-500 mb-4">{error}</p>}
    //     {user ? (
    //       <div>
    //         <h2 className='text-2xl font-bold mb-4 text-gray-800'>Welcome, {user.name}!</h2>
    //         <p>Email: {user.email}</p>
    //         <p>Role: {user.role}</p>
    //         {user?.role === "player" ? (
    //           <EventList user={user} />
    //         ):(
    //           <p className="text-gray-600">You are not authorized to view this content.</p>
    //         )}
    //       </div>
    //       ) : (
    //         <div>
    //           <h2 className='text-2xl font-bold mb-6 text-gray-800'>Please log in or register</h2>
    //           <div className='flex flex-col gap-y-4'>
    //             <Link to="/login" className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4 font-medium">Login</Link>
    //             <Link to="/register" className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md mt-4 font-medium">Register</Link>
    //           </div>
    //         </div>
    //       )
    //     }
    //   </div>
      
    // </div>
    
  )
}
export default Home;




  // const hacerplayer = async () => {
  //   try {
  //     const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/register`, {
  //       "name": "alicio", 
  //       "email": "alicio@test.com",
  //       "password": "123456",
  //       "role": "player"
  //     });
  //     console.log(response.data);
  //   } catch (error) {
  //     console.error('Error making user player:', error);
  //   }
  // };

  // const haceradmin = async () => {
  //   try {
  //     const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/register`, {
  //       "name": "adminwow", 
  //       "email": "admin@test.com",
  //       "password": "123456",
  //       "role": "admin"
  //     });
  //     console.log(response.data);
  //   } catch (error) {
  //     console.error('Error making user admin:', error);
  //   }
  // };
  
  // const logearplayer = async () => { 
  //   try {
  //     await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
  //       "name": "alicio", 
  //       "password": "123456"
  //     });
  //   } catch (error) {
  //     console.error('Error logging in:', error);
  //   }
  // };
  // const logearadmin = async () => { 
  //   try {
  //     await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
  //       "name": "adminwow", 
  //       "password": "123456"
  //     });
  //   } catch (error) {
  //     console.error('Error logging in:', error);
  //   }
  // };

  // const protectedroute = async () => { 
  //   try {
  //     const get = await axios.get(`${import.meta.env.VITE_API_URL}/api/protected`);
  //     console.log(get.data);
      
  //     console.log("usuario", user);
  //   } catch (error) {
  //     console.error('Error getting protected data:', error);
  //   }
  // };