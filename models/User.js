const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstname: { type: String, required: true, min: 3, max: 255 },
  lastname: { type: String, required: true, min: 4, max: 255 },
  email: { type: String, required: true, min: 6, max: 255 },
  password: { type: String, required: true, min: 8, max: 1024 },
  date: { type: Date, default: Date.now() },
});

module.exports = mongoose.model('User', userSchema);
