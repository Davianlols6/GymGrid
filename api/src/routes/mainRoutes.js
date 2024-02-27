const express = require('express');
const router = express.Router();

const memberRoutes = require('../routes/memberRoutes');

const jwtMiddleware = require('../middlewares/jwtMiddleware');
const bcryptMiddleware = require('../middlewares/bcryptMiddleware');
const memberController = require('../controllers/memberController');

router.post("/register", memberController.checkUsernameOrEmailExist, bcryptMiddleware.hashPassword, memberController.register, jwtMiddleware.generateToken, jwtMiddleware.sendToken);
router.post("/login", memberController.login, bcryptMiddleware.comparePassword, jwtMiddleware.generateToken, jwtMiddleware.sendToken);
router.post("/logout", (req, res) => {res.clearCookie('authToken'); res.send('Cookie has been removed');});

router.use("/member", memberRoutes);

module.exports = router;