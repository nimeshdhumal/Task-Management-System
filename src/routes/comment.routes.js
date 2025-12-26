const express = require('express');
const router = express.Router();
const commentController = require('../controllers/comment.controller');
const { commentParamSchema } = require('../validators/query.schema');
const commentBodySchema = require('../validators/comment.schema');
const requestValidator = require('../middlewares/validate.request');
const tokenVerification = require('../middlewares/auth.middleware');

router.get('/:id', requestValidator({ params: commentParamSchema }), commentController.getSingleCommnet);
router.put('/:id', requestValidator({ body: commentBodySchema, params: commentParamSchema }), tokenVerification, commentController.updateComment);
router.delete('/:id', requestValidator({ params: commentParamSchema }), tokenVerification, commentController.deleteComment);

module.exports = router;