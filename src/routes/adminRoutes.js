const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
//const requestValidator = require('../middlewares/validateRequest');
const tokenVerification = require('../middlewares/authMiddleware');
const roleChecking = require('../middlewares/roleMiddleware');

router.get('/tasks',tokenVerification,roleChecking,adminController.getAllTasks);
console.log(typeof  roleChecking);
console.log(typeof  tokenVerification);
console.log(typeof  adminController);
// router.delete('/tasks/:id');
// router.delete('/comments/:id');