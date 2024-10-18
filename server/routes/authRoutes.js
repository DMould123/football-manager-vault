const express = require('express')
router = express.Router()
const cors = require('cors')
const {
  test,
  registerUser,
  loginUser,
  getProfile,
  logoutUser
} = require('../controllers/authController')
const { saveBestXI, getBestXI, authenticateUser } = require('../controllers/bestXIController')

// Middleware
router.use(
  cors({
    credentials: true,
    origin: ['http://localhost:5173', 'http://localhost:5174'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
  })
)

// GET
router.get('/', test)

// POST Route for Register
router.post('/register', registerUser)

// POST Route for Login
router.post('/login', loginUser)

// GET Route fror Profile
router.get('/profile', getProfile)

// POST Route for Logout
router.post('/logout', logoutUser)

// Best XI routes
router.post('/best-xi', authenticateUser, saveBestXI);
router.get('/best-xi', authenticateUser, getBestXI);

// export router
module.exports = router
