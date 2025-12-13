const express = require('express');
const router = express.Router();
const verifyTokenMiddleware = require('../middlewares/authMiddleware');
const adminRoleOnly = require('../middlewares/roleMiddleware');
const requestValidator = require('../middlewares/validateRequest');
const { signUpSchema, loginSchema } = require('../validators/schemaValidator');
const userController = require('../controllers/authController');

router.post('/signup', requestValidator(signUpSchema), userController.signUp);
router.post('/login', requestValidator(loginSchema), userController.login);
router.get('/me', verifyTokenMiddleware, adminRoleOnly, userController.getUserDetailsByToken);
// router.post('/tasks/:taskId/comments',verifyTokenMiddleware);
// router.get('/tasks/:taskId/comments',verifyTokenMiddleware);

module.exports = router;