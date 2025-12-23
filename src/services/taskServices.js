const taskModel = require('../models/taskModel');
const userModel = require('../models/userModel');
const commentModel = require('../models/commentsModel');
const AppError = require('../utils/AppError');

module.exports = {
    createTask: async (data) => {
        const { id, title, description, status, createdAt, updatedAt } = await taskModel.create(data);
        return { id, title, description, status, createdAt, updatedAt };
    },

    getAllTasks: async (pageno, limitno, sort, setInOrder, userId, includeDeleted) => {
        const result = await taskModel.findAndCountAll({ order: [[sort, setInOrder]], paranoid: !includeDeleted, where: { userId: userId } });
        const total = result.count;
        const totalPages = Math.ceil(total / limitno);
        return { data: result.rows, meta: { page: pageno, limit: limitno, total, totalPages } };
    },

    getTaskById: async (id) => {
        const checkDeletedRows = await taskModel.findByPk(id);
        if (checkDeletedRows == null) throw new AppError('Task Not Found', 404);
        return checkDeletedRows;
    },

    updateTask: async (id, data) => {
        await taskModel.update(data, { where: { id } });
        return await taskModel.findByPk(id);
    },

    deleteTask: async (id, force) => {
        console.log(id, force);
        if (force === 'true') {
            return await taskModel.destroy({ where: { id }, force: true });
        } else {
            return await taskModel.destroy({ where: { id } });
        }

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

        //IF userId not matched then user cannot comment...
        if (taskIdFound == null || userIdFound == null) {
            throw new AppError("You Could Not Comments on others tasks!", 400);
        } else {
            return await commentModel.create(commentData);
        }
    },

    getAllCommentsOfTask: async (taskId, pageno, limitno) => {
        const fetchedAllRowsWithCount = await commentModel.findAll({ where: { taskId: taskId } });
        const data = fetchedAllRowsWithCount;
        const total = fetchedAllRowsWithCount.length;
        const totalPages = Math.ceil(total / limitno);
        return { data, meta: { page: pageno, limit: limitno, total, totalPages } };
    }
};