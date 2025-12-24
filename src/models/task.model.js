const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Task = sequelize.define('Task', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING(255), allowNull: false },
    description: { type: DataTypes.TEXT },
    status: { type: DataTypes.ENUM('todo', 'in-progress', 'done'), defaultValue: 'todo' },
    userId: { type: DataTypes.INTEGER, allowNull: false },
}, {
    tableName: 'tasks',
    paranoid: true,
    timestamps: true
});

Task.associate = (models) => {
    Task.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user',
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
    });

    Task.hasMany(models.Comment, {
        foreignKey: 'taskId',
        as: 'comments',
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
    });
};

module.exports = Task;