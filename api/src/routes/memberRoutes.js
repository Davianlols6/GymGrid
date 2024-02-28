const express = require('express');
const router = express.Router();

const memberController = require('../controllers/memberController');
const jwtMiddleware = require('../middlewares/jwtMiddleware');

router.get('/auth', jwtMiddleware.verifyToken, memberController.getMemberByAuthToken);
router.get('/id/:id', memberController.getMemberById);
router.get('/username/:username', memberController.getMemberByUsername);
router.put('/auth/username', jwtMiddleware.verifyToken, memberController.updateUsername);
router.put('/auth/active_programme/:id', jwtMiddleware.verifyToken, memberController.updateActiveProgramme);

module.exports = router;