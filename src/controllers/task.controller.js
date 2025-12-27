const taskService = require('../services/task.service');
const buildActor = require('../utils/actor.util');
const meta = null;
module.exports = {

    create: async (req, res) => {
        try {
            const actor = buildActor(req);
            const taskData = { ...actor.body, userId: actor.userId };
            const result = await taskService.createTask(taskData);
            res.status(200).json({ success: true, message: "Task created successfully", data: result });
        } catch (error) {
            res.status(400).json({ status: false, message: error.message });
        }
    },

    getAll: async (req, res) => {
        try {
            const actor = buildActor(req);
            const includeDeleted = false;
            const tasks = await taskService.getAllTasks(actor.page, actor.limit, actor.sort, actor.order, actor.userId, includeDeleted);
            res.status(200).json({ success: true, data: tasks });
        } catch (error) {
            res.status(400).json({ status: false, message: error.message });
        }
    },

    getTaskById: async (req, res) => {
        try {
            const actor = buildActor(req);
            const task = await taskService.getTaskById(actor.id);
            res.status(200).json({ success: true, data: task, meta });
        } catch (error) {
            res.status(400).json({ status: false, message: error.message });
        }
    },

    update: async (req, res) => {
        try {
            const actor = buildActor(req);
            const updated = await taskService.updateTask(actor.id, actor.body);
            res.status(200).json({ success: true, data: updated });
        } catch (error) {
            res.status(400).json({ status: false, message: error.message });
        }
    },

    delete: async (req, res) => {
        try {
            const actor = buildActor(req);
            await taskService.deleteTask(actor.id);
            res.status(200).json({ success: true, data: "Task deleted" });
        } catch (error) {
            res.status(400).json({ status: false, message: error.message });
        }
    },

    commentOnTask: async (req, res) => {
        try {
            const actor = buildActor(req);
            const commentData = { ...actor.body, userId: actor.userId, taskId: actor.id };
            const data = await taskService.commentOnTask(commentData);
            res.status(200).json({ success: true, message: 'Comment added successfully', data, meta });
        } catch (error) {
            res.status(400).json({ status: false, message: error.message });
        }
    },

    getAllCommentsTask: async (req, res) => {
        try {
            const actor = buildActor(req);
            const data = await taskService.getAllCommentsOfTask(actor.id, actor.page, actor.limit);
            res.status(200).json({ success: true, data });
        } catch (error) {
            res.status(400).json({ status: false, message: error.message });
        }
    }
}