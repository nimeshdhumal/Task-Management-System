const express = require('express');
const router = express.Router();
const verifyTokenMiddleware = require('../middlewares/auth.middleware');
const adminRoleOnly = require('../middlewares/role.middleware');
const requestValidator = require('../middlewares/validate.request');
const { signUpSchema, loginSchema } = require('../validators/auth.body.schema');
const commonHeaderSchema = require('../validators/common.header.schema');
const authHeaders = require('../validators/auth.header.schema');
const userController = require('../controllers/auth.controller');
const logger = require('../utils/logger');

logger.log('info', 'Route section execute..');
router.post('/signup', requestValidator({ body: signUpSchema, headers: commonHeaderSchema }), userController.signUp);
router.post('/login', requestValidator({ body: loginSchema, headers: commonHeaderSchema }), userController.login);
router.get('/me', verifyTokenMiddleware, adminRoleOnly, userController.getUserDetailsByToken);

module.exports = router;