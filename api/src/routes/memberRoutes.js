const express = require('express');
const router = express.Router();

const memberController = require('../controllers/memberController');
const jwtMiddleware = require('../middlewares/jwtMiddleware');

router.get('/auth', jwtMiddleware.verifyToken, memberController.getMemberByAuthToken);

module.exports = router;