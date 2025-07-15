const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String }, // Optional for Google OAuth users
  name: { type: String, required: true },
  phone: { type: String, default: '' }, // Optional for Google OAuth
  role: { type: String, enum: ['owner', 'builder', 'supplier'], required: true },
  googleId: { type: String, unique: true, sparse: true },
});

module.exports = mongoose.model('User', userSchema);