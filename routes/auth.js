const router = require('express').Router();
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const Joi = require('@hapi/joi');
const jwt = require('jsonwebtoken');

// implement the validation for the registration

const registerSchema = Joi.object({
  firstname: Joi.string().min(3).required(),
  lastname: Joi.string().min(4).required(),
  email: Joi.string().min(6).required(),
  password: Joi.string().min(8).required(),
});

router.post('/register', async (req, res) => {
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
});

module.exports = router;
