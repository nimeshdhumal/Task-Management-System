const userModel = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const AppError = require('../utils/app.error');

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

    login: async (data) => {
        const isEmailExists = await userModel.findOne({ where: { email: data.email } });

        const matched = await bcrypt.compare(data.password, isEmailExists.password);

        if (matched == false) { throw new AppError("PASSWORD INVALID"); } //Checking the Passowrd;;;

        const { id, name, email, role } = isEmailExists;
        const user = { id, name, email, role };

        if (isEmailExists != null) {
            let payload = user;
            let secretKey = process.env.JWT_SECRET_KEY;
            let JWT_EXPIRE = process.env.JWT_EXPIRES;

            const token = jwt.sign(payload, secretKey, { expiresIn: JWT_EXPIRE });//Geneate the token;;;
            return { success: true, message: 'Login successful', token: token, user };
        } else {
            throw new AppError("USER ARE NOT REGISTER", 400);//checking if email exists or not;;;
        }
    },

    getUserDetailsByToken: async (userToken) => {
        const token = userToken.split(' ')[1];
        const decodedToekn = jwt.verify(token, process.env.JWT_SECRET_KEY);

        let userEmail = decodedToekn.email;
        const userDetails = await userModel.findOne({ where: { email: userEmail } });

        if (userDetails == null) throw new AppError('USER NOT FOUND', 404);

        const { id, name, email, role } = userDetails;
        return { id, name, email, role };
    },

    getUserDetailsByEmailId: async (emailId) => {
        const userDetails = await userModel.findOne({ where: { email: emailId } });
        const { id, name, email, role } = userDetails;
        return { id, name, email, role };
    }

}