const taskModel = require('../models/task.model');
const userModel = require('../models/user.model');
const commentModel = require('../models/comment.model');
const AppError = require('../utils/app.error');

module.exports = {
    createTask: async (data) => {
        const { id, title, description, status, createdAt, updatedAt } = await taskModel.create(data);
        return { id, title, description, status, createdAt, updatedAt };
    },

    getAllTasks: async (pageno, limitno, sort, setInOrder, userId, includeDeleted) => {
        const result = await taskModel.findAndCountAll({ order: [[sort, setInOrder]], paranoid: !includeDeleted, where: { userId: userId }, raw: true });
        const total = result.count;
        const totalPages = Math.ceil(total / limitno);
        return { data: result.rows, meta: { page: pageno, limit: limitno, total, totalPages } };
    },

    getTaskById: async (id, userId) => {
        const fetchDataByUserId = await taskModel.findOne({ where: { id: id, userId }, raw: true });
        if (fetchDataByUserId == null) throw new AppError('Task Not Found OR You could not see others tasks.', 404);
        return fetchDataByUserId;
    },

    updateTask: async (id, requestBody, userId) => {
        const fetchDataByUserId = await taskModel.findOne({ where: { id: id, userId }, raw: true });
        if (fetchDataByUserId == null) {
            throw new AppError('Task Not Found OR You could not see others tasks.', 404);
        } else {
            await taskModel.update(requestBody, { where: { id }, raw: true });
            return await taskModel.findByPk(id);
        }
    },

    deleteTask: async (id, force) => {
        console.log(id, force);
        if (force === 'true') {
            return await taskModel.destroy({ where: { id }, force: true, raw: true });
        } else {
            return await taskModel.destroy({ where: { id }, raw: true });
        }

    },

    commentOnTask: async (commentData) => {
        //Getting the task_id from tasks table
        const taskIdFound = await taskModel.findOne({
            attributes: ['userId'],
            where: { id: commentData.taskId },
            raw: true
        });

        //Getting the userId from token;;
        const userIdFound = await userModel.findOne({
            attributes: ['id'],
            where: { id: commentData.userId },
            raw: true
        });

        //IF userId not matched then user cannot comment...
        if (taskIdFound == null || userIdFound == null) {
            throw new AppError("You Could Not Comments on others tasks!", 400);
        } else {
            return await commentModel.create(commentData);
        }
    },

    getAllCommentsOfTask: async (taskId, pageno, limitno) => {
        const fetchedAllRowsWithCount = await commentModel.findAll({ where: { taskId: taskId }, raw: true });
        const data = fetchedAllRowsWithCount;
        const total = fetchedAllRowsWithCount.length;
        const totalPages = Math.ceil(total / limitno);
        return { data, meta: { page: pageno, limit: limitno, total, totalPages } };
    }
};