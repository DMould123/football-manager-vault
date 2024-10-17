const User = require('../models/user')
const { hashPassword, comparePassword } = require('../helpers/auth')
const jwt = require('jsonwebtoken')

const test = (req, res) => {
  res.json('test works')
}

// Register Endpoint
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body
    // Check if name was entered as required
    if (!name) {
      return res.json({ error: 'A valid name is required' })
    }
    // Check if password is valid
    if (!password || password.length < 6) {
      return res.json({
        error: 'Password is required & should be minimum 6 characters long'
      })
    }
    // Check if email is unique
    const exist = await User.findOne({ email })
    if (exist) {
      return res.json({ error: 'Email already exists' })
    }

    const hashedPassword = await hashPassword(password)

    // Create a new user
    const user = await User.create({
      name,
      email,
      password: hashedPassword
    })

    // Return success response
    return res.json({ message: 'User registered successfully 🌟' })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error: 'Internal server error' })
  }
}

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body
    // Check if user exists
    const user = await User.findOne({ email })
    if (!user) {
      return res.json({ error: 'No user found' })
    }
    // Check if password matches
    const match = await comparePassword(password, user.password)
    if (!match) {
      return res.json({ error: 'Incorrect password' })
    }
    // If match is true, generate JWT token
    const token = jwt.sign(
      { email: user.email, id: user._id, name: user.name },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    )

    // Set cookie and return success response
    res.cookie('token', token, { httpOnly: true })
    return res.json({ message: 'Login successful', token })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error: 'Internal server error' })
  }
}

const getProfile = (req, res) => {
  const { token } = req.cookies
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, {}, (err, user) => {
      if (err) throw err
      res.json(user)
    })
  } else {
    res.json(null)
  }
}

// Log Out the User and clear the cookie
const logoutUser = (req, res) => {
  res.clearCookie('token')
  return res.json({ message: 'Logout successful' })
}

// Export
module.exports = {
  test,
  registerUser,
  loginUser,
  getProfile,
  logoutUser
}
