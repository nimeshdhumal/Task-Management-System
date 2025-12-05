require('dotenv').config();
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.DB, process.env.USER, process.env.PASSWORD, {
    host: process.env.HOST,
    dialect: 'mysql'
});

//Check the connection;;;
async function connection() {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully');
        // await sequelize.sync();
        //console.log('Table created successfully!');
    } catch (error) {
        console.log('Unable to connect to the database:', error);
        // console.log('Table not created successfully');
    }
}

connection();

module.exports = { sequelize };