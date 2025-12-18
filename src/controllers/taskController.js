const taskService = require('../services/taskServices');
const meta =null;
module.exports = {

    create: async (req, res) => {
        try {
            const taskData = { ...req.body, userId: req.user.id };
            const result = await taskService.createTask(taskData);
            res.status(200).json({ success: true, message: "Task created successfully", data: result });
        } catch (error) {
            res.status(400).json({ status: false, message: error.message });
        }
    },

    getAll: async (req, res) => {
        try {
            const tasks = await taskService.getAllTasks(req.query.page, req.query.limit, req.query.sort, req.query.order);
            res.status(200).json({ success: true, data: tasks });
        } catch (error) {
            res.status(400).json({ status: false, message: error.message });
        }
    },

    getTaskById: async (req, res) => {
        try {
            const task = await taskService.getTaskById(req.params.id);
            res.status(200).json({ success: true, data: task , meta});
        } catch (error) {
            res.status(400).json({ status: false, message: error.message });
        }
    },

    update: async (req, res) => {
        try {
            const updated = await taskService.updateTask(req.params.id, req.body);
            res.status(200).json({ success: true, data: updated });
        } catch (error) {
            res.status(400).json({ status: false, message: error.message });
        }
    },

    delete: async (req, res) => {
        try {
            await taskService.deleteTask(req.params.id);
            res.status(200).json({ success: true, data: "Task deleted" });
        } catch (error) {
            res.status(400).json({ status: false, message: error.message });
        }
    },

    commentOnTask: async (req, res) => {
        try {
            const commentData = { ...req.body, userId: req.user.id, taskId: req.params.id };
            const data = await taskService.commentOnTask(commentData);
            res.status(200).json({ success: true, message: 'Comment added successfully', data , meta});
        } catch (error) {
            res.status(400).json({ status: false, message: error.message });
        }
    },

    getAllCommentsTask: async (req, res) => {
        try {
            const data = await taskService.getAllCommentsOfTask(req.params.id,req.query.page, req.query.limit);
            res.status(200).json({ success: true, data });
        } catch (error) {
            res.status(400).json({ status: false, message: error.message });
        }
    }
}