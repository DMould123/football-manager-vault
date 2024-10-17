const express = require('express')
const dotenv = require('dotenv').config()
const cors = require('cors')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')

const app = express()

// Middleware
app.use(express.json())
app.use(cookieParser()) // Call cookieParser as a function
app.use(express.urlencoded({ extended: false }))

const MONGO_URL = process.env.MONGO_URL
const port = 8000

// MongoDB Connection
mongoose
  .connect(MONGO_URL)
  .then(() => console.log('Connected to MongoDB 🌍'))
  .catch((err) => console.error('Failed to connect to MongoDB:', err))

// Setup routes
app.use('/', require('./routes/authRoutes'))

// Start the server
app.listen(port, () => {
  console.log(`Server Running on Port ${port} 🚀`)
})
