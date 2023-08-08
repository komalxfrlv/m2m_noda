const router = require('express').Router();
const users = require("./users.controller");
const { isAuthenticated } = require('../../middlewares/auth.middleware');
const {isAdmin} = require('../../middlewares/role.middleware')

router.get('/profile', isAuthenticated, users.profile);
router.get('/profile/:email', isAuthenticated, isAdmin, users.profileById);
router.get('/verify/:userEmail', users.confirmUserEmail);


router.post('/profile', isAuthenticated, users.changeUserSettings);
router.post('/sendCode', isAuthenticated, users.sendRefreshCodeAtMail);
router.post('/resetPassword',isAuthenticated, users.ChangePasswordByResetCode);
router.post('/forgotenPassword', users.resetForgotenPassword);
router.post('/setPushToken', isAuthenticated, users.setPushToken);
router.post('/setNotificationSettings', isAuthenticated, users.changeNotificationSettings);

module.exports = router;