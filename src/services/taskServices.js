const taskModel = require('../models/taskModel');

module.exports = {
    createTask: async (data) => {
        return await taskModel.create(data);
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
    }
};