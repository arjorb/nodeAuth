const router = require('express').Router();
const { getAllUsers } = require('../controllers/user');

router.get('/all-users', getAllUsers);

module.exports = router;
