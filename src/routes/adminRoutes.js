const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const tokenVerification = require('../middlewares/authMiddleware');
const validateRequest = require('../middlewares/validateRequest');
const { paginationSchema, taskSchema } = require('../validators/querySchema');
const roleChecking = require('../middlewares/roleMiddleware');

router.get('/tasks', validateRequest({ query: paginationSchema }), tokenVerification, roleChecking, adminController.getAllTasks);
router.delete('/tasks/:id', validateRequest({ params: taskSchema }), tokenVerification, roleChecking, adminController.deleteTasks);
router.delete('/comments/:id', validateRequest({ params: taskSchema }), tokenVerification, roleChecking, adminController.deleteComment);

module.exports = router;