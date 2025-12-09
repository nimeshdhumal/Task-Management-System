const userModel = require('../models/userModel');

module.exports = {
    signUp: async (data) => {
        return await userModel.create(data);
    },

    IsEmailAvail: async (checkEmail) => {
        const emailFound = await userModel.findOne({
            where: { email: checkEmail },
            attributes: ['email'],
        });
        return !!emailFound; // true if email exists, false if not
    },

    getUserDetail: async (email) => {
        return await userModel.findOne({ where: { email: email } });
    },

    login: async (data) => {
        return await userModel.create(data);
    }
}