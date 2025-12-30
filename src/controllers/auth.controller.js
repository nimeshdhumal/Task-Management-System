const userService = require('../services/auth.service');
const logger = require('../utils/logger');

module.exports = {
    signUp: async (req, res, next) => {
        try {
            const requestBody = { name: req.body.name, email: req.body.email, password: req.body.password, role: req.body.role };
            await userService.signUp(requestBody);
            logger.info('Auth Controller: signUp successfully');
            res.status(201).json({ status: true, message: "User registered successfully." });
        } catch (error) {
            logger.error('Auth Controller-signUp : ', error);
            next(error); //Send the error to global error handler middleware;;;
        }
    },

    login: async (req, res, next) => {
        try {
            const credentials = { email: req.body.email, password: req.body.password };
            let result = await userService.login(credentials);
            logger.info('Auth Controller: login successfully.');
            res.status(200).json({ status: true, message: result });
        } catch (error) {
            logger.error('Auth Controller-login Failed : ', error);
            next(error); //Send the error to global error handler middleware;;;
        }
    },

    getUserDetailsByToken: async (req, res, next) => {
        try {
            let userToken = req.headers.authorization;
            let user = await userService.getUserDetailsByToken(userToken);
            logger.info('Auth Controller: /me endpoint  called successfully.');
            res.status(200).json({ user });
        } catch (error) {
            logger.error('Auth Controller Failed: ', error);
            next(error); //Send the error to global error handler middleware;;;
        }
    }
}