import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const NavBar = ({ user, setUser }) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef();
  const handleLogout = async () => {
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/logout`, {}, {
        withCredentials: true
      });
      setUser(null);
      navigate("/");
    } catch (error) {
      console.error("Error de deslogeo:", error);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link
          to="/"
          className="navbar-title"
        >
        Board Games App
        </Link>

        <div className="flex items-center gap-4">
          {user ? (
            <div
              className="relative"
              ref={dropdownRef}
            >
              <button
                onClick={() => setOpen(!open)}
                className="navbar-user"
              >
                <div className="navbar-name">
                  {user.name?.charAt(0).toUpperCase()}
                </div>
                <span className="navbar-hidename">
                  {user.name}
                </span>
              </button>

              {open && (
                <div className="navbar-dropdown">
                  <button
                    onClick={() => {
                      navigate("/profile");
                      setOpen(false);
                    }}
                    className="navbar-dropdown-item"
                  >
                    Profile
                  </button>

                  <hr />
                  <button
                    onClick={handleLogout}
                    className="navbar-dropdown-logout"
                  >
                    Logout
                  </button>
                </div>
              )}

            </div>

          ) : (

            <div className="navbar-auth">
              <Link to="/login" className="navbar-login">Login</Link>
              <Link to="/register" className="navbar-register">Register</Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
