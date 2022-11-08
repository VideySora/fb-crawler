const { required } = require('@hapi/joi')
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
  // firstName: {
  //   type: String
  // },
  // lastName: {
  //   type: String
  // },
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  }
})

const User = mongoose.model('User', UserSchema)
module.exports = User