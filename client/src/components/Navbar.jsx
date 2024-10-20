import React, { useState, useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { IoClose, IoMenu } from 'react-icons/io5'
import { UserContext } from '../../context/userContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false)
  const { user, setUser } = useContext(UserContext)
  const navigate = useNavigate()

  const toggleMenu = () => {
    setShowMenu(!showMenu)
  }

  const closeMenuOnMobile = () => {
    if (window.innerWidth <= 1150) {
      setShowMenu(false)
    }
  }

  const handleLogout = async () => {
    try {
      await axios.post('/logout');
      // Clear user from context
      setUser(null);
      toast.success('Logged out successfully');
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error.response?.data || error.message);
      toast.error('Logout failed. Please try again.');
    }
  };

  return (
    <header className="header">
      <nav className="nav container">
        <NavLink to="/" className="nav__logo">
          Brand Logo
        </NavLink>

        {/* Toggle Button */}
        <div className="nav__toggle" id="nav-toggle" onClick={toggleMenu}>
          {showMenu ? <IoClose /> : <IoMenu />}
        </div>

        {/* Menu Items */}
        <div className={`nav__menu ${showMenu ? 'show-menu' : ''}`}>
          <ul className="nav__list">
            <li className="nav__item">
              <NavLink to="/" className="nav__link" onClick={closeMenuOnMobile}>
                Home
              </NavLink>
            </li>
            <li className="nav__item">
              <NavLink
                to="/about"
                className="nav__link"
                onClick={closeMenuOnMobile}
              >
                About
              </NavLink>
            </li>
            <li className="nav__item">
              <NavLink
                to="/contact"
                className="nav__link"
                onClick={closeMenuOnMobile}
              >
                Contact
              </NavLink>
            </li>
            {user ? (
              <li className="nav__item">
                <NavLink
                  to="/"
                  className="nav__link nav__logout-btn"
                  onClick={handleLogout}
                >
                  Logout
                </NavLink>
              </li>
            ) : (
              <>
                <li className="nav__item">
                  <NavLink
                    to="/login"
                    className="nav__link"
                    onClick={closeMenuOnMobile}
                  >
                    Login
                  </NavLink>
                </li>
                <li className="nav__item">
                  <NavLink
                    to="/register"
                    className="nav__link"
                    onClick={closeMenuOnMobile}
                  >
                    Register
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
    </header>
  )
}

export default Navbar
