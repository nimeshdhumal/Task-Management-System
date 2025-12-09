const express = require('express');
const router = express.Router();
const requestValidator = require('../middlewares/validateRequest');
const { signUpSchema, loginSchema } = require('../validators/schemaValidator');
const userController = require('../controllers/authController');

router.post('/signup', requestValidator(signUpSchema), userController.signUp);
router.post('/login', requestValidator(loginSchema), userController.login);

module.exports = router;