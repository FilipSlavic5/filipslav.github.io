// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  fitnessGoals: String,
  // Dodaj dodatne atribute po potrebi
});

module.exports = mongoose.model('User', userSchema);