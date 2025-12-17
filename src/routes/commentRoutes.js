const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');
const commentQuerySchema = require('../validators/querySchema');
const commentBodySchema = require('../validators/commentSchema');
const requestValidator = require('../middlewares/validateRequest');
const tokenVerification = require('../middlewares/authMiddleware');

router.get('/:id', requestValidator({ params: commentQuerySchema }), commentController.getSingleCommnet);
router.put('/:id', requestValidator({ body: commentBodySchema, params: commentQuerySchema }), tokenVerification, commentController.updateComment);
router.delete('/:id', requestValidator({ params: commentQuerySchema }), tokenVerification, commentController.deleteComment);

module.exports = router;