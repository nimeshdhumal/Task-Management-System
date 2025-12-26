const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin.controller');
const tokenVerification = require('../middlewares/auth.middleware');
const validateRequest = require('../middlewares/validate.request');
const { paginationSchema, taskSchema, deleteSchema } = require('../validators/query.schema');
const roleChecking = require('../middlewares/role.middleware');

router.get('/tasks', validateRequest({ query: paginationSchema }), tokenVerification, roleChecking, adminController.getAllTasks);
router.delete('/tasks/:id', validateRequest({ params: taskSchema, query: deleteSchema }), tokenVerification, roleChecking, adminController.deleteTasks);
router.delete('/comments/:id', validateRequest({ params: taskSchema }), tokenVerification, roleChecking, adminController.deleteComment);

module.exports = router;