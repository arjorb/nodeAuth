const bcrypt = require('bcryptjs');
const User = require('../models/User');
const Joi = require('@hapi/joi');
const jwt = require('jsonwebtoken');

//Register controller
//------------------------------------------------------------------------------

// implement the validation for the registration
const registerSchema = Joi.object({
  firstname: Joi.string().min(3).required(),
  lastname: Joi.string().min(4).required(),
  email: Joi.string().min(6).required(),
  password: Joi.string().min(8).required(),
});

const register = async (req, res) => {
  //check if the email is already registered
  const emailExists = await User.findOne({ email: req.body.email });
  if (emailExists) {
    return res.status(400).json({ message: 'Email already exist' });
  }
  //hash the password for the user account
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  const user = new User({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    password: hashedPassword,
  });

  try {
    const { error } = await registerSchema.validateAsync(req.body);

    if (error) {
      return res.status(400).send(error.detail[0].message);
    } else {
      const saveUser = await user.save();
      return res.status(200).send('user created successfully');
    }
  } catch (error) {
    return res.status(500).send(error);
  }
};

//Login controller
//------------------------------------------------------------------------------

const loginSchema = Joi.object({
  email: Joi.string().required().min(3),
  password: Joi.string().required().min(8),
});

const login = async (req, res) => {
  const user = await findOne({ email: req.body.email });
  if (!user) {
    return res.status(404).send('Incorrect email or password');
  }

  const checkPassword = await bcrypt.compare(user.password, req.body.password);
  if (!checkPassword) {
    return res.status(404).send('Incorrect email or password');
  }

  try {
    const { error } = await loginSchema.varidateAsync(req.body);
    if (error) {
      return res.status(401).send(error.detail[0].message);
    }
    return res.status(200).send(`${user.firstname} ${user.last}`);
  } catch (error) {
    return res.status(401).send(error);
  }
};
module.exports = { register, login };
