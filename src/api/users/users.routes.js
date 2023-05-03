const router = require('express').Router();

const users = require("./users.controller");

const { isAuthenticated } = require('../../middlewares/auth.middleware');

router.get('/profile', isAuthenticated, users.profile);

router.post('/sendCode', users.sendRefreshCodeAtMail);

router.post('/resetPassword', users.ChangePasswordByResetCode);

module.exports = router;