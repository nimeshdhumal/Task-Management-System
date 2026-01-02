const express = require('express');
const router = express.Router();
const commentController = require('../controllers/comment.controller');
const { commentParamSchema } = require('../validators/query.schema');
const commentBodySchema = require('../validators/comment.schema');
const requestValidator = require('../middlewares/validate.request');
const tokenVerification = require('../middlewares/auth.middleware');
const logger = require('../utils/logger');

logger.info('Comment Routes section started.');
router.get('/:id', tokenVerification, requestValidator({ params: commentParamSchema }), commentController.getSingleCommnet);
router.put('/:id', tokenVerification, requestValidator({ body: commentBodySchema, params: commentParamSchema }), commentController.updateComment);
router.delete('/:id', tokenVerification, requestValidator({ params: commentParamSchema }), commentController.deleteComment);

module.exports = router;