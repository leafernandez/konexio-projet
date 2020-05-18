const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: false,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 5
  },
  password: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: false
  },
  picture: {
      type: String,
      required: true,
  },
  newsletter: {
      type: Boolean
  }
}, {
  timestamps: true,
});

const User = mongoose.model('User', userSchema);

module.exports = User;