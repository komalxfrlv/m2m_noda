const router = require('express').Router();

const auth = require('./auth/auth.routes');
const users = require('./users/users.routes');
const pushes = require('./pushes/pushes.routes')
const ecosystem = require('./_ecosystem');
const shelldues = require('./shelldues')
const { isAuthenticated } = require('../middlewares/auth.middleware');
const {
    isAdmin,
    isManager,
    isDeveloper,
    isSupport
  } = require('../middlewares/role.middleware');

router.use('/auth', auth);
router.use('/users', users);
router.use('/pushes', pushes);
router.use('/shelldues', pushes);
router.use('/e', isAuthenticated, isAdmin, ecosystem);

module.exports = router;