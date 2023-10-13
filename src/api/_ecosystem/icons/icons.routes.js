const router = require('express').Router();
const { isAuthenticated } = require('../../../middlewares/auth.middleware');
const {isAdmin} = require('../../../middlewares/role.middleware')
const icon = require('./icons.controller');


router.get('/', isAuthenticated, icon.getStandartIcons);
router.get('/user', isAuthenticated, icon.getIncons);

router.post('/', isAuthenticated, icon.postNewIcon);
router.post('/standart', isAuthenticated, isAdmin, icon.postNewStandartIcon);

router.put('/', isAuthenticated, icon.updateUserIcon);
router.put('/standart', isAuthenticated, isAdmin, icon.updateStandartIcon);

router.delete('/', isAuthenticated, icon.deleteIcon)
router.delete('/standart', isAuthenticated, isAdmin, icon.deleteStandartIcon)

module.exports = router;