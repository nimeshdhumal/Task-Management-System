const taskService = require('../services/task.service');
const buildActor = require('../utils/actor.util');
const logger = require('../utils/logger');
const meta = null;
logger.info('Task Controller called ');
module.exports = {

    create: async (req, res) => {
        try {
            const actor = buildActor(req);
            const taskData = { ...actor.requestBody, userId: actor.userId };
            const result = await taskService.createTask(taskData);
            logger.info('Task Controller: create function called.');
            res.status(200).json({ success: true, message: "Task created successfully", data: result });
        } catch (error) {
            logger.error('Task Controller create function Failed: ', error);
            res.status(400).json({ status: false, message: error.message });
        }
    },

    getAll: async (req, res) => {
        try {
            const actor = buildActor(req);
            const includeDeleted = false;
            const tasks = await taskService.getAllTasks(actor.page, actor.limit, actor.sort, actor.order, actor.userId, includeDeleted);
            logger.info('Task Controller: getAll function called.');
            res.status(200).json({ success: true, data: tasks });
        } catch (error) {
            logger.error('Task Controller getAll function Failed: ', error);
            res.status(400).json({ status: false, message: error.message });
        }
    },

    getTaskById: async (req, res) => {
        try {
            const actor = buildActor(req);
            const task = await taskService.getTaskById(actor.id, actor.userId);
            logger.info('Task Controller: getTaskById function called.');
            res.status(200).json({ success: true, data: task, meta });
        } catch (error) {
            logger.error('Task Controller getTaskById function Failed: ', error);
            res.status(400).json({ status: false, message: error.message });
        }
    },

    update: async (req, res) => {
        try {
            const actor = buildActor(req);
            const updated = await taskService.updateTask(actor.id, actor.requestBody, actor.userId);
            res.status(200).json({ success: true, data: updated, meta });
        } catch (error) {
            res.status(400).json({ status: false, message: error.message });
        }
    },

    delete: async (req, res) => {
        try {
            const actor = buildActor(req);
            await taskService.deleteTask(actor.id, false, actor.userId);
            logger.info('Task deleted by user ', actor.id);
            res.status(200).json({ success: true, data: "Task deleted" });
        } catch (error) {
            logger.error('Task deleted by User Failed: ', error);
            res.status(400).json({ status: false, message: error.message });
        }
    },

    commentOnTask: async (req, res) => {
        try {
            const actor = buildActor(req);
            const commentData = { ...actor.requestBody, userId: actor.userId, taskId: actor.id };
            const data = await taskService.commentOnTask(commentData);
            res.status(200).json({ success: true, message: 'Comment added successfully', data, meta });
        } catch (error) {
            res.status(400).json({ status: false, message: error.message });
        }
    },

    getAllCommentsTask: async (req, res) => {
        try {
            const actor = buildActor(req);
            const data = await taskService.getAllCommentsOfTask(actor.id, actor.page, actor.limit,actor.userId,actor.userRole);
            res.status(200).json({ success: true, data });
        } catch (error) {
            res.status(400).json({ status: false, message: error.message });
        }
    }
}