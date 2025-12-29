const jwt = require('jsonwebtoken');
const AppError = require('../utils/app.error');

module.exports = (req, res, next) => {
    try {

        const authorizationHeader = req.headers.authorization;
        console.log(authorizationHeader);
        if (!authorizationHeader) throw new AppError('Authorisation is required', 401);

        const parts = authorizationHeader.trim().split(' ');

        if (parts.length !== 2 || parts[0] !== 'Bearer') {
            throw new AppError('Invalid authorization format', 401);
        }

        const token = parts[1];

        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = {
            id: decoded.id,
            email: decoded.email,
            role: decoded.role
        };

        next();
    } catch (error) {
        next(error); //Send the error to global error handler middleware;;;
    }
}