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

// Middleware
router.use(
  cors({
    credentials: true,
    origin: 'http://localhost:5173'
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

// export router
module.exports = router
