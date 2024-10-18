const mongoose = require('mongoose')
const { Schema } = mongoose

// create Schema for a new user
const userSchema = new Schema({
  name: String,
  email: {
    type: String,
    unique: true
  },
  password: String
})

const UserModel = mongoose.model('User', userSchema)

// export UserModel
module.exports = UserModel
