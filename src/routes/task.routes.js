const express = require('express');
const router = express.Router();
const taskController = require('../controllers/task.controller');
const validateRequest = require('../middlewares/validate.request');
const createTasksSchema = require('../validators/task.body.schema');
const authHeaders = require('../validators/auth.header.schema');
const commentSchema = require('../validators/comment.schema');
const { taskSchema, paginationSchema } = require('../validators/query.schema');
const tokenVerification = require('../middlewares/auth.middleware');
const logger = require('../utils/logger');

logger.info('Task Routes section started.');
router.post('/', validateRequest({ body: createTasksSchema, headers: authHeaders }), tokenVerification, taskController.create);
router.get('/', validateRequest({ query: paginationSchema }), tokenVerification, taskController.getAll);
router.get('/:id', validateRequest({ params: taskSchema }), tokenVerification, taskController.getTaskById);
router.put('/:id', validateRequest({ body: createTasksSchema, headers: authHeaders, params: taskSchema }), tokenVerification, taskController.update);
router.delete('/:id', validateRequest({ params: taskSchema }), tokenVerification, taskController.delete);
router.post('/:id/comments', validateRequest({ body: commentSchema, params: taskSchema }), tokenVerification, taskController.commentOnTask);
router.get('/:id/comments', validateRequest({ params: taskSchema, query: paginationSchema }), tokenVerification, taskController.getAllCommentsTask);

module.exports = router;