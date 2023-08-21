const User = require('../models/User');

const getAllUsers = (req, res) => {
  User.find()
    .then(result => res.send(result))
    .catch(err => res.send(err));
};

module.exports = { getAllUsers };
