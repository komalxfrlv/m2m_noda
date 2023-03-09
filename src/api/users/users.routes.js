const router = require('express').Router();

const users = require("./users.controller");

const { isAuthenticated } = require('../../middlewares/auth.middleware');

router.get('/profile', isAuthenticated, users.profile);

module.exports = router;