const jwt = require('jsonwebtoken');

const verify = (req, res, next) => {
  const token = req.header('auth-token');
  if (!token) {
    res.status(403).send(`Not authorized`);
  }
  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = verified;
    next();
  } catch (error) {
    res.status(400).send('invalid token');
  }
};

module.exports = verify;
