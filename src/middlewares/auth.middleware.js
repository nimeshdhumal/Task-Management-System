const jwt = require('jsonwebtoken');
const AppError = require('../utils/app.error');
const logger = require('../utils/logger');

module.exports = (req, res, next) => {
    try {
        logger.info('Auth Middleware section started');
        const authorizationHeader = req.headers.authorization;
        if (!authorizationHeader) throw new AppError('Authorisation is required', 401);

        const token = authorizationHeader.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

        req.user = {
            id: decoded.id,
            email: decoded.email,
            role: decoded.role
        };
        logger.info('Auth Middleware section passed successfully!');
        next();
    } catch (error) {
        logger.error('Auth Middleware Failed: ',error);
        next(error); //Send the error to global error handler middleware;;;
    }
}