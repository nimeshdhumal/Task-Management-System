const jwt = require('jsonwebtoken');
const AppError = require('../utils/app.error');

module.exports = (req, res, next) => {
    const authorizationHeader = req.headers.authorization;
    if(!authorizationHeader) throw new AppError('Authorisation is required',404);

    const token = authorizationHeader.split(' ')[1];
    const secretKey = process.env.JWT_SECRET_KEY;
    try {
        const decoded = jwt.verify(token, secretKey);
        req.user = {
            id: decoded.id,
            email: decoded.email,
            role: decoded.role
        };
        next();
    } catch (error) {
        res.status(400).json({ status: false, Message: 'TOKEN IS INVALID', error });
    }
}