const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const authorizationHeader = req.headers.authorization;
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