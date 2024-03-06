const express = require('express');
const router = express.Router();

const programmeController = require('../controllers/programmeController');
const jwtMiddleware = require('../middlewares/jwtMiddleware');

router.post('/auth', jwtMiddleware.verifyToken, programmeController.checkProgrammeNameExists, programmeController.createProgramme);
router.get('/auth', jwtMiddleware.verifyToken, programmeController.getAllProgrammesByAuthToken);
router.put('/auth/:id', jwtMiddleware.verifyToken, programmeController.checkProgrammeNameExists, programmeController.updateProgrammeById);
router.delete('/auth/:id', jwtMiddleware.verifyToken, programmeController.deleteProgrammeById);

module.exports = router;