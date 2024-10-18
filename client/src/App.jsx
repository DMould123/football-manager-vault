import './App.css'
import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import axios from 'axios'
import { ToastContainer } from 'react-toastify'
import { UserContextProvider } from '../context/userContext'
import PrivateRoute from './components/PrivateRoute'
import BestXI from './pages/BestXI'
import 'react-toastify/dist/ReactToastify.css'

axios.defaults.baseURL = 'http://localhost:8000'
axios.defaults.withCredentials = true

function App() {
  return (
    <UserContextProvider>
      <Navbar />
      <ToastContainer position="bottom-right" autoClose={3000} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/best-xi" element={<PrivateRoute><BestXI /></PrivateRoute>} />
      </Routes>
    </UserContextProvider>
  )
}

export default App
