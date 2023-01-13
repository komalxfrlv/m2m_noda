const router = require('express').Router();

const auth = require('./auth/auth.routes');
const users = require('./users/users.routes');

const smarthome = require('./_ecosystem/smarthome');
const powersupply = require('./_ecosystem/powersupply');

router.use('/auth', auth);
router.use('/users', users);

router.use('/smarthome', smarthome);
router.use('/powersupply', powersupply);

module.exports = router;