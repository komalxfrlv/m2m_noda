const router = require('express').Router();
const { isAuthenticated } = require('../../../middlewares/auth.middleware');
const {isAdmin} = require('../../../middlewares/role.middleware')
const icon = require('./icons.controller');


router.get('/', isAuthenticated, icon.getStandartIcons);
router.get('/user', isAuthenticated, icon.getIncons);

router.post('/', isAuthenticated, icon.postNewIcon);
router.post('/stasndart', isAuthenticated, isAdmin, icon.postNewStandartIcon);

router.put('/', isAuthenticated, icon.updateUserIcon);
router.delete('/', isAuthenticated, icon.deleteIcon)

module.exports = router;