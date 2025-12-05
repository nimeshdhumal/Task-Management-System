const taskService = require('../services/taskServices');

module.exports = {

    create: async (req, res) => {
        const result = await taskService.createTask(req.body);
        res.json({ success: true, data: result });
    },

    getAll: async (req, res) => {
        const tasks = await taskService.getAllTasks();
        res.json({ success: true, data: tasks });
    },

    getOne: async (req, res) => {
        const task = await taskService.getTaskById(req.params.id);
        res.json({ success: true, data: task });
    },

    update: async (req, res) => {
        const updated = await taskService.updateTask(req.params.id, req.body);
        res.json({ success: true, data: updated });
    },

    delete: async (req, res) => {
        await taskService.deleteTask(req.params.id);
        res.json({ success: true, message: "Task deleted" });
    }

}