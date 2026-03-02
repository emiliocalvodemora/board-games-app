import React from 'react'
import { Link } from 'react-router-dom';

const Profile = ({user, error}) => {
  return (
    <div className='profile-container'>
      <div className='profile-container-inner'>
        {error && <p className="profile-error">{error}</p>}
        {user ? (
          <div>
            <h2 className='profile-welcome'>Welcome, {user.name}!</h2>
            <p>Email: {user.email}</p>
            <p>Role: {user.role}</p>
          </div>
          ) : (
            <div>
              <h2 className='profile-welcome'>Please log in or register</h2>
              <div className='profile-auth'>
                <Link to="/login" className="profile-login">Login</Link>
                <Link to="/register" className="profile-register">Register</Link>
              </div>
            </div>
          )
        }
      </div>
      
    </div>
  )
}
export default Profile;
