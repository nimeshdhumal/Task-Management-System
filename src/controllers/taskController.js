const taskService = require('../services/taskServices');

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
            const tasks = await taskService.getAllTasks();
            res.status(200).json({ success: true, data: tasks });
        } catch (error) {
            res.status(400).json({ status: false, message: error.message });
        }
    },

    getOne: async (req, res) => {
        try {
            const task = await taskService.getTaskById(req.params.id);
            res.status(200).json({ success: true, data: task });
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
            const result = await taskService.commentOnTask(commentData);
            res.status(200).json({ success: true, message: 'Comment added successfully', result });
        } catch (error) {
            res.status(400).json({ status: false, message: error.message });
        }
    }

}