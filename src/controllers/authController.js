const userService = require('../services/authService');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {
    signUp: async (req, res) => {
        let { password } = req.body;
        req.body.password = await bcrypt.hash(password, 10);//Convert the plain password into the Hash Code;;;
        await userService.signUp(req.body);
        res.json({ success: true, message: "User registered successfully" });
    },

    login: async (req, res) => {
        const emailMatched = await userService.IsEmailAvail(req.body.email);
        let userDetails = await userService.getUserDetail(req.body.email);
        if (emailMatched == true) {
            let payload = req.body;
            let secretKey = process.env.JWT_SECRET_KEY;
            let JWT_EXPIRE = process.env.JWT_EXPIRES;

            const token = jwt.sign(payload, secretKey, { expiresIn: JWT_EXPIRE });
            res.json({ success: true, message: "Login successful", token: token, userDetails });
        } else {
            res.status(404).json({ success: false, message: 'EMAIL NOT FOUND' });
        }
    }
}