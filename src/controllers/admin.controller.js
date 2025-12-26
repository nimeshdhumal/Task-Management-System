const taskService = require('../services/task.service');
const commentService = require('../services/comment.service');
const buildActor = require('../utils/actor.util');
const meta = null;

module.exports = {
    getAllTasks: async (req, res) => {
        try {
            const actor = buildActor(req);
            const includeDeleted = true;
            const tasks = await taskService.getAllTasks(actor.page, actor.limit, actor.sort, actor.order, actor.userId, includeDeleted);
            res.status(200).json({ success: true, data: tasks });
        } catch (error) {
            res.status(400).json({ status: false, message: error.message });
        }
    },

    deleteTasks: async (req, res) => {
        try {
            const actor = buildActor(req);
            await taskService.deleteTask(actor.id, actor.force);
            res.status(200).json({ success: true, data: "Task deleted", meta });
        } catch (error) {
            res.status(400).json({ status: false, message: error.message });
        }
    },

    deleteComment: async (req, res) => {
        try {
            const actor = buildActor(req);
            await commentService.deleteComment(actor.id, actor.userId, actor.force);
            res.status(200).json({ success: true, message: 'Comment deleted successfully', meta });
        } catch (error) {
            res.status(400).json({ status: false, message: error.message });
        }
    }
}