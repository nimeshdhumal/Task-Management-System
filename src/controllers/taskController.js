const taskService = require('../services/taskServices');

module.exports = {

    create: async (req, res) => {
        try {
            const result = await taskService.createTask(req.body);
            res.status(200).json({ success: true, data: result });
        } catch (error) {
            res.status(400).json({ success: false, data: error });
        }
    },

    getAll: async (req, res) => {
        try {
            const tasks = await taskService.getAllTasks();
            res.status(200).json({ success: true, data: tasks });
        } catch (error) {
            res.status(400).json({ success: false, data: error });
        }
    },

    getOne: async (req, res) => {
        try {
            const task = await taskService.getTaskById(req.params.id);
            res.status(200).json({ success: true, data: task });
        } catch (error) {
            res.status(400).json({ success: false, data: error });
        }
    },

    update: async (req, res) => {
        try {
            const updated = await taskService.updateTask(req.params.id, req.body);
            res.status(200).json({ success: true, data: updated });
        } catch (error) {
            res.status(400).json({ success: false, data: error });
        }
    },

    delete: async (req, res) => {
        try {
            await taskService.deleteTask(req.params.id);
            res.status(200).json({ success: true, data: "Task deleted" });
        } catch (error) {
            res.status(400).json({ success: false, data: error });
        }
    }

}