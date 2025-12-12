const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const authorizationHeader = req.headers.authorization;
    const token = authorizationHeader.split(' ')[1];
    const secretKey = process.env.JWT_SECRET_KEY;
    console.log('authMiddleware..above Try');
    try {
        const decoded = jwt.verify(token, secretKey);
        req.email = decoded.email;
        console.log('authMiddleware..In Try');
        next();
    } catch (error) {
        res.status(400).json({ status: false, Message: 'TOKEN IS INVALID', error });
        console.log("authMiddleware failed");
    }
}