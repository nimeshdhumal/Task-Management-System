const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');
const AppError = require('../utils/AppError');

module.exports = {
    signUp: async (data) => {
        const isEmailExists = await userModel.findOne({
            attributes: ['email'],
            where: { email: data.email }
        });

        if (isEmailExists) throw new AppError("Email already exists", 400);//checking if email exists or not;;;

        data.password = await bcrypt.hash(data.password, 10);//Convert the plain password into the Hash Code;;;

        await userModel.create(data);//save data into DB;;;

    },

    login: async (email) => {
        const isEmailExists = await userModel.findOne({
            attributes: ['email'],
            where: { email: email }
        });

        if (isEmailExists) throw new AppError("Email already exists", 400);//checking if email exists or not;;;

        // await userModel.create(data);
    }
}