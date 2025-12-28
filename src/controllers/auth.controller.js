const userService = require('../services/auth.service');

module.exports = {
    signUp: async (req, res, next) => {
        try {
            const requestBody = { name: req.body.name, email: req.body.email, password: req.body.password, role: req.body.role };
            await userService.signUp(requestBody);
            res.status(201).json({ status: true, message: "User registered successfully." });
        } catch (error) {
            next(error); //Send the error to global error handler middleware;;;
        }
    },

    login: async (req, res, next) => {
        try {
            const credentials = { email: req.body.email, password: req.body.password };
            let result = await userService.login(credentials);
            res.status(200).json({ status: true, message: result });
        } catch (error) {
            next(error); //Send the error to global error handler middleware;;;
        }
    },

    getUserDetailsByToken: async (req, res, next) => {
        try {
            let userToken = req.authorization;
            let user = await userService.getUserDetailsByToken(userToken);
            res.status(200).json({ user });
        } catch (error) {
            next(error); //Send the error to global error handler middleware;;;
        }
    }

}