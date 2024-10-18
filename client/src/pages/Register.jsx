import { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { MdEmail } from 'react-icons/md'
import { RiLockPasswordFill } from 'react-icons/ri'
import { FaUser } from 'react-icons/fa'
import logo from '../assets/logo.png'

export default function Register() {
  const navigate = useNavigate()
  const [data, setData] = useState({
    name: '',
    email: '',
    password: ''
  })

  const registerUser = async (e) => {
    e.preventDefault()
    const { name, email, password } = data
    try {
      const { data } = await axios.post('/register', {
        name,
        email,
        password
      })
      if (data.error) {
        toast.error(data.error)
      } else {
        setData({ name: '', email: '', password: '' })
        toast.success('Registration was successful. Thanks for registering! 🙏')
        navigate('/login')
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="wrapper">
      <form onSubmit={registerUser}>
        <img src={logo} alt="Logo" className="logo" />
        <h1>Register</h1>
        <div className="input-field">
          <div className="input-wrapper">
            <input
              type="text"
              id="name"
              placeholder="Name"
              value={data.name}
              onChange={(e) => setData({ ...data, name: e.target.value })}
              autoComplete="name"
            />
            <FaUser className="icon" />
          </div>
        </div>
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
              autoComplete="new-password"
            />
            <RiLockPasswordFill className="icon" />
          </div>
        </div>
        <button type="submit">Register</button>
        <div className="register-link">
          <p>
            Already have an account?{' '}
            <a href="#" onClick={() => navigate('/login')}>
              Login here
            </a>
          </p>
        </div>
      </form>
    </div>
  )
}
