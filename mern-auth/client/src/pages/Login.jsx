import { useState, useContext } from 'react'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { MdEmail } from 'react-icons/md'
import { RiLockPasswordFill } from 'react-icons/ri'
import { UserContext } from '../../context/userContext'
import logo from '../assets/logo.png'

export default function Login() {
  const navigate = useNavigate()
  const { setUser } = useContext(UserContext)
  const [data, setData] = useState({
    email: '',
    password: ''
  })

  const loginUser = async (e) => {
    e.preventDefault()
    const { email, password } = data
    try {
      const { data: responseData } = await axios.post('/login', {
        email,
        password
      })
      if (responseData.error) {
        toast.error(responseData.error)
      } else {
        setUser(responseData.user) // Update user context immediately
        setData({ email: '', password: '' })
        toast.success('Login was successful. Welcome! 🎉')
        navigate('/dashboard')
      }
    } catch (error) {
      console.log('Login error:', error)
    }
  }

  return (
    <div className="wrapper">
      <form onSubmit={loginUser}>
        <img src={logo} alt="Logo" className="logo" />
        <h1>Login</h1>
        <div className="input-field">
          <div className="input-wrapper">
            <input
              type="email"
              id="email"
              placeholder="Email"
              value={data.email}
              onChange={(e) => setData({ ...data, email: e.target.value })}
              autoComplete="email"
            />
            <MdEmail className="icon" />
          </div>
        </div>
        <div className="input-field">
          <div className="input-wrapper">
            <input
              type="password"
              id="password"
              placeholder="Password"
              value={data.password}
              onChange={(e) => setData({ ...data, password: e.target.value })}
              autoComplete="current-password"
            />
            <RiLockPasswordFill className="icon" />
          </div>
        </div>
        <button type="submit">Login</button>
        <div className="register-link">
          <p>
            Don't have an account?{' '}
            <a href="#" onClick={() => navigate('/register')}>
              Register here
            </a>
          </p>
        </div>
      </form>
    </div>
  )
}
