const router = require('express').Router();
const data = require('./data.controller');
const { isAuthenticated } = require('../../../middlewares/auth.middleware');
const {isAdmin} = require('../../../middlewares/role.middleware')

router.post('/', data.create);

router.get('/', isAuthenticated, data.getInterval);

router.get('/longInterval', isAuthenticated, data.getLongInterval);

module.exports = router;