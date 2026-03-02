import React from 'react'
import {useNavigate} from 'react-router-dom';
import axios from 'axios';

const Login = ( {setUser} ) => {
  const [form, setForm] = React.useState({
    name: '',
    password: '',
  });

const [error, setError] = React.useState("");
const navigate = useNavigate();

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/login`, form);
    setUser(response.data.data);
    navigate('/');
  } catch (error) {
    console.error('Error logging in:', error);
    setError("Login failed.");
  }
};

  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit} className="auth-form">
        <h2 className='auth-form-title'>Login</h2>
        {error && <p className="auth-error">{error}</p>}
        <input 
          type="text" 
          placeholder="name" 
          className='auth-input' 
          value={form.name} 
          onChange={(e) => setForm({...form, name: e.target.value})} />
        <input 
          type="password" 
          placeholder="password" 
          className='auth-input' 
          value={form.password} 
          onChange={(e) => setForm({...form, password: e.target.value})} />
        <button type="submit" className="auth-button">Login</button>
      </form>
    </div>
  )
}
export default Login;