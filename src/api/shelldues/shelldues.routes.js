//TODO: миша ебани роуты по братски // Если норм, то удали этот коммент 

const router = require('express').Router();
const shelldues = require('./shelldues.controller')
const { isAuthenticated } = require('../../middlewares/auth.middleware')

router.get('/station/:stationId', shelldues.getShelldueForStation);

router.get('/:shelldueId', isAuthenticated, shelldues.getShelldue);
router.get('/user', isAuthenticated, shelldues.getAllShellduesOfUser);

router.post('/', isAuthenticated, shelldues.addNewShelldue);

router.put('/', isAuthenticated, shelldues.updateShelldue);

module.exports = router;