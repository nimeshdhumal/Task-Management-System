const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },

    name: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },

    email: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true,
    },

    password: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },

    role: {
        type: DataTypes.ENUM('admin', 'user'),
        allowNull: false,
        defaultValue: 'user',
    }
}, {
    tableName: 'users',
    timestamps: true
});

User.associate = (models) => {
    User.hasMany(models.Task, {
        foreignKey: "userId",
        as: "tasks",
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
    });

    User.hasMany(models.Comment, {
        foreignKey: userId,
        as: "comments",
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
    });
};

module.exports = User;