const router = require('express').Router();

const auth = require('./auth/auth.routes');
const users = require('./users/users.routes');

const ecosystem = require('./_ecosystem');

router.use('/auth', auth);
router.use('/users', users);

router.use('/e', ecosystem);

module.exports = router;