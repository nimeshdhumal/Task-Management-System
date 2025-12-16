const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const validateRequest = require('../middlewares/validateRequest');
const createTasksSchema = require('../validators/taskBodySchema');
const authHeaders = require('../validators/authHeaderSchema');
const commentSchema = require('../validators/commentSchema');
const taskSchema = require('../validators/querySchema');
const tokenVerification = require('../middlewares/authMiddleware');

router.post('/', validateRequest({ body: createTasksSchema, headers: authHeaders }), tokenVerification, taskController.create);
router.get('/', taskController.getAll);
router.get('/:id', validateRequest({ params: taskSchema }), taskController.getOne);
router.put('/:id', validateRequest({ body: createTasksSchema, headers: authHeaders, params: taskSchema }), tokenVerification, taskController.update);
router.delete('/:id', validateRequest({ params: taskSchema }), taskController.delete);
router.post('/:id/comments', validateRequest({ body: commentSchema, params: taskSchema }), tokenVerification, taskController.commentOnTask);
router.get('/:id/comments', validateRequest({ params: taskSchema }), taskController.getAllCommentsTask);

module.exports = router;