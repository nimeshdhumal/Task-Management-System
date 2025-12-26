const userService = require('../services/auth.service');

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
            let result = await userService.login(req.body);
            res.status(200).json({ status: true, message: result });
        } catch (error) {
            res.status(400).json({ status: false, message: error.message });
        }
    },

    getUserDetailsByToken: async (req, res) => {
        try {
            let userToken = req.headers.authorization;
            let user = await userService.getUserDetailsByToken(userToken);
            res.status(200).json({ user });
        } catch (error) {
            res.status(400).json({ status: false, message: error.message });
        }
    }

}