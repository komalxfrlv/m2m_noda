const router = require('express').Router();

const auth = require('./auth/auth.routes');
const users = require('./users/users.routes');

router.use('/auth', auth);
router.use('/users', users);

module.exports = router;