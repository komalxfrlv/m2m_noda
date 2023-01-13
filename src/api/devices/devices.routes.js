const router = require('express').Router();
const { isAuthenticated } = require('../../middlewares/auth.middleware');

router.get('/profile', isAuthenticated, users.profile);

module.exports = router;