const router = require('express').Router();
const shelldues = require('./shelldues.controller')
const { isAuthenticated } = require('../../middlewares/auth.middleware')

router.get('/station/:stationId', shelldues.getShelldueForStation);
router.get('/users', shelldues.getAllShellduesOfUser);
router.get('/:shelldueId', shelldues.getShelldue);

router.post('/', shelldues.addNewShelldue);

router.put('/', shelldues.updateShelldue);

module.exports = router;