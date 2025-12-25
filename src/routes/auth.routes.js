const express = require('express');
const router = express.Router();
const verifyTokenMiddleware = require('../middlewares/authMiddleware');
const adminRoleOnly = require('../middlewares/roleMiddleware');
const requestValidator = require('../middlewares/validateRequest');
const { signUpSchema, loginSchema } = require('../validators/authBodySchema');
const commonHeaderSchema = require('../validators/commonHeaderSchema');
const userController = require('../controllers/authController');

router.post('/signup', requestValidator({ body: signUpSchema, headers: commonHeaderSchema }), userController.signUp);
router.post('/login', requestValidator({ body: loginSchema, headers: commonHeaderSchema }), userController.login);
router.get('/me', verifyTokenMiddleware, adminRoleOnly, userController.getUserDetailsByToken);

module.exports = router;