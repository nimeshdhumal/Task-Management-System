const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const validateRequest = require('../middlewares/validateRequest');
const { createTasksSchema } = require('../validators/schemaValidator');

router.post('/', validateRequest(createTasksSchema), taskController.create);
router.get('/', taskController.getAll);
router.get('/:id', taskController.getOne);
router.put('/:id', taskController.update);
router.delete('/:id', taskController.delete);

module.exports = router;