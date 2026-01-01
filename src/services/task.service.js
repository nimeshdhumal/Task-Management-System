const taskModel = require('../models/task.model');
const commentModel = require('../models/comment.model');
const AppError = require('../utils/app.error');

const fetchComments = async (taskId, page, limit) => {
    const offset = (page - 1) * limit;

    const { rows, count } = await commentModel.findAndCountAll({
        where: { taskId },
        limit,
        offset,
        order: [['createdAt', 'DESC']],
        raw: true
    });

    return {
        data: rows,
        meta: {
            page,
            limit,
            total: count,
            totalPages: Math.ceil(count / limit)
        }
    };
};


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

    deleteTask: async (id, force, userId) => {
        console.log(id, force, userId);
        const fetchDataByUserId = await taskModel.findOne({ where: { id: id, userId }, raw: true });
        console.log(fetchDataByUserId);
        if (fetchDataByUserId == null) {
            throw new AppError('Task Not Found OR You could not see others tasks.', 404);
        } else {
            if (force === 'true') {
                return await taskModel.destroy({ where: { id }, force: true, raw: true });
            } else {
                return await taskModel.destroy({ where: { id }, raw: true });
            }
        }
    },

    commentOnTask: async (commentData) => {
        const taskIdFound = await taskModel.findByPk(commentData.taskId, { raw: true });
        if (taskIdFound == null) throw new AppError('Task does not exists', 404);
        return await commentModel.create(commentData);
    },

    getAllCommentsOfTask: async (taskId, pageno, limitno, userId, role) => {
        
        //Fetch task ownership;;;
        const task = await taskModel.findByPk(taskId, { attributes: ['userId'], raw: true });
        if (!task) throw new AppError('Task not found', 404);

        //Admin role;;;
        if (role === 'admin') return await fetchComments(taskId, pageno, limitno);

        //Task owner allow
        if (task.userId === userId) return await fetchComments(taskId, pageno, limitno);

        //comment participant allow;;;
        const hasCommented = await commentModel.findOne({ where: { taskId, userId }, attributes: ['id'], raw: true });
        if (hasCommented) return await fetchComments(taskId, pageno, limitno);

        //Otherwise Deny;;;
        throw new AppError('Access denied', 403);
    }
};