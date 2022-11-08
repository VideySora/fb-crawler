//const { required } = require('@hapi/joi')
const mongoose = require('mongoose')
const { Schema } = mongoose;

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  projects: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Project'
    }
  ],
});

const User = mongoose.model('User', UserSchema)
module.exports = User