const router = require('express').Router();
const shelldues = require('./shelldues.controller')
const standart = require('./standarts/standart.shelldues.routes')
const { isAuthenticated } = require('../../middlewares/auth.middleware')

router.use('/standart', standart)

router.get('/station/:stationId', shelldues.getShelldueForStation);
router.get('/user', shelldues.getAllShellduesOfUser);
router.get('/shelldue/:shelldueId', shelldues.getShelldue);
router.get('/type/:type', shelldues.getShellduesByType)
router.post('/', shelldues.addNewShelldue);

router.put('/shelldue/:shelldueId', shelldues.updateShelldue);

router.delete('/shelldue/:shelldueId', shelldues.deleteShelldue);

module.exports = router;