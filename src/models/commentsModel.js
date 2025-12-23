const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Comment = sequelize.define('Comment', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    text: { type: DataTypes.TEXT, allowNull: false },
    taskId: { type: DataTypes.INTEGER, allowNull: false },
    userId: { type: DataTypes.INTEGER, allowNull: false },
    createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    updatedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
}, {
    tableName: 'comments',
    timestamps: true,
    paranoid: true
});

Comment.associate = (models) => {
    Comment.belongsTo(models.Task, {
        foreignKey: 'taskId',
        as: 'task',
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
    });

    Comment.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user',
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
    });
};

module.exports = Comment;