const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const validateRequest = require('../middlewares/validateRequest');
const { createTasksSchema, headerSchema, commentSchema } = require('../validators/schemaValidator');
const tokenVerification = require('../middlewares/authMiddleware');

router.post('/', validateRequest(headerSchema, 'headers'), validateRequest(createTasksSchema, 'body'), tokenVerification, taskController.create);
router.get('/', validateRequest(headerSchema, 'headers'), tokenVerification, taskController.getAll);
router.get('/:id', taskController.getOne);
router.put('/:id', taskController.update);
router.delete('/:id', taskController.delete);
router.post('/:id/comments', validateRequest(headerSchema, 'headers'), validateRequest(commentSchema), tokenVerification, taskController.commentOnTask);
// router.get('/tasks/:id/comments',verifyTokenMiddleware);

module.exports = router;