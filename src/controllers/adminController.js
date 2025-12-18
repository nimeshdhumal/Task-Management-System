const tasksService = require('../services/taskServices');
const meta = null;
module.exports = {

    getAllTasks: async (req, res) => {
        try {
            const tasks = await tasksService.getAllTasks(req.query.page, req.query.limit, req.query.sort, req.query.order);
            res.status(200).json({ success: true, data: tasks });
        } catch (error) {
            res.status(400).json({ status: false, message: error.message });
        }
    }
}