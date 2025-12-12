const userService = require('../services/authService');
const jwt = require('jsonwebtoken');

module.exports = {
    signUp: async (req, res) => {
        try {
            await userService.signUp(req.body);
            res.status(200).json({ status: true, message: "User registered successfully." });
        } catch (error) {
            res.status(400).json({ status: false, message: error.message });
        }
    },

    login: async (req, res) => {
        try {
            let result = await userService.login(req.body.email);
            res.status(200).json({ status: true, message: result });
        } catch (error) {
            res.status(400).json({ status: false, message: error.message });
        }
    },

    userVerify: async (req, res) => {
        const userDetails = await userService.getUserDetail(req.email);
        if (userDetails != null) {
            const { id, name, email, role } = userDetails;
            const user = { id, name, email, role };
            res.status(200).json(user);
        } else {
            res.status(400).json({ status: false, message: "USER NOT EXISTS" });
        }
    }
}