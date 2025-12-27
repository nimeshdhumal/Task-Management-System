const userService = require('../services/auth.service');
const buildActor = require('../utils/actor.util');

module.exports = {
    signUp: async (req, res) => {
        try {
            const actor = buildActor(req);
            await userService.signUp(actor.body);
            res.status(200).json({ status: true, message: "User registered successfully." });
        } catch (error) {
            res.status(400).json({ status: false, message: error.message });
        }
    },

    login: async (req, res) => {
        try {
            const actor = buildActor(req);
            let result = await userService.login(actor.body);
            res.status(200).json({ status: true, message: result });
        } catch (error) {
            res.status(400).json({ status: false, message: error.message });
        }
    },

    getUserDetailsByToken: async (req, res) => {
        try {
            const actor = buildActor(req);
            let userToken = actor.authorization;
            let user = await userService.getUserDetailsByToken(userToken);
            res.status(200).json({ user });
        } catch (error) {
            res.status(400).json({ status: false, message: error.message });
        }
    }

}