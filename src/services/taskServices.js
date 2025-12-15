const taskModel = require('../models/taskModel');
const userModel = require('../models/userModel');
const commentModel = require('../models/commentsModel');
const AppError = require('../utils/AppError');

module.exports = {
    createTask: async (data) => {
        const { id, title, description, status, createdAt, updatedAt } = await taskModel.create(data);
        return { id, title, description, status, createdAt, updatedAt };
    },

    getAllTasks: async () => {
        return await taskModel.findAll();
    },

    getTaskById: async (id) => {
        return await taskModel.findByPk(id);
    },

    updateTask: async (id, data) => {
        await taskModel.update(data, { where: { id } });
        return await taskModel.findByPk(id);
    },

    deleteTask: async (id) => {
        return await taskModel.destroy({ where: { id } });
    },

    commentOnTask: async (commentData) => {
        //Getting the task_id from tasks table
        const taskIdFound = await taskModel.findOne({
            attributes: ['userId'],
            where: { id: commentData.taskId }
        });

        //Getting the userId from token;;
        const userIdFound = await userModel.findOne({
            attributes: ['id'],
            where: { id: commentData.userId }
        });

        //IF any table id not matched then user cannot comment...
        if (taskIdFound == null || userIdFound == null) {
            throw new AppError("You Could Not Comments on others tasks!", 400);
        } else {
            return await commentModel.create(commentData);
        }
    }
};