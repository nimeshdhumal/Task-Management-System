const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const validateRequest = require('../middlewares/validateRequest');
const createTasksSchema = require('../validators/taskBodySchema');
const authHeaders = require('../validators/authHeaderSchema');
const commentSchema = require('../validators/commentSchema');
const { taskSchema, paginationSchema } = require('../validators/querySchema');
const tokenVerification = require('../middlewares/authMiddleware');

router.post('/', validateRequest({ body: createTasksSchema, headers: authHeaders }), tokenVerification, taskController.create);
router.get('/', validateRequest({ query: paginationSchema }), tokenVerification, taskController.getAll);
router.get('/:id', validateRequest({ params: taskSchema }), taskController.getTaskById);
router.put('/:id', validateRequest({ body: createTasksSchema, headers: authHeaders, params: taskSchema }), tokenVerification, taskController.update);
router.delete('/:id', validateRequest({ params: taskSchema }), taskController.delete);
router.post('/:id/comments', validateRequest({ body: commentSchema, params: taskSchema }), tokenVerification, taskController.commentOnTask);
router.get('/:id/comments', validateRequest({ params: taskSchema, query: paginationSchema }), taskController.getAllCommentsTask);

module.exports = router;