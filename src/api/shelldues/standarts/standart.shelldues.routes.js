const router = require('express').Router();
const standartShelldue = require('./standart.shelldues.controller')
const {isAdmin} = require('../../../middlewares/role.middleware')

router.get('/:mac', standartShelldue.getStandartScriptsByDeviceCode)
router.post('/', isAdmin, standartShelldue.postNewStandartScript)

module.exports = router