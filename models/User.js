const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    firstname: { type: 'string', required: true, min: 3 },
    lastname: { type: 'string', required: true, min: 3 },
    email: { type: 'string', required: true },
    password: { type: 'string', required: true, min: 8 },
  },
  { timestamps: { type: 'boolean', required: true } }
);

module.exports = mongoose.Model('User', userSchema);
