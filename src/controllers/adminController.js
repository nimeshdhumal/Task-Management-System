const taskService = require('../services/taskServices');
const commentService = require('../services/commentService');
const meta = null;
module.exports = {
    getAllTasks: async (req, res) => {
        try {
            const includeDeleted = true;
            const tasks = await taskService.getAllTasks(req.query.page, req.query.limit, req.query.sort, req.query.order, req.user.id, includeDeleted);
            res.status(200).json({ success: true, data: tasks });
        } catch (error) {
            res.status(400).json({ status: false, message: error.message });
        }
    },

    deleteTasks: async (req, res) => {
        try {
            await taskService.deleteTask(req.params.id, req.query.force);
            res.status(200).json({ success: true, data: "Task deleted", meta });
        } catch (error) {
            res.status(400).json({ status: false, message: error.message });
        }
    },

    deleteComment: async (req, res) => {
        try {
            await commentService.deleteComment(req.params.id, req.user.id, req.query.force);
            res.status(200).json({ success: true, message: 'Comment deleted successfully', meta });
        } catch (error) {
            res.status(400).json({ status: false, message: error.message });
        }
    }
}