const commentsModel = require('../models/comment.model');
const taskModel = require('../models/task.model');
const AppError = require('../utils/app.error');

module.exports = {

    getSingleComment: async (commentId, userId, role) => {
        const comment = await commentsModel.findByPk(commentId, {
            attributes: ['id', 'text', 'userId', 'taskId'],
            raw: true
        });

        if (!comment) {
            throw new AppError('Comment not found', 404);
        }

        // Admin can access anything
        if (role === 'admin') return comment;

        // Fetch task owner
        const task = await taskModel.findByPk(comment.taskId, {
            attributes: ['userId'],
            raw: true
        });

        // Task owner OR comment owner
        if (task.userId === userId || comment.userId === userId) {
            return comment;
        }

        throw new AppError('Access denied', 403);
    },

    updateComment: async (commentData) => {
        //Find out the comment id is available or not;;;
        const foundCommentId = await commentsModel.findOne({
            attributes: ['userId', 'id', 'taskId'],
            where: { id: commentData.commentId }
        });

        if (foundCommentId == null) {
            throw new AppError('Comment not found.', 400);
        } else if (foundCommentId.userId != commentData.userId) {
            throw new AppError('You are not allowed to update this comment.', 400);
        } else {
            const response = {
                id: commentData.commentId, text: commentData.text, taskId: foundCommentId.taskId,
                userId: foundCommentId.userId
            }
            const [updatedCount] = await commentsModel.update({ text: commentData.text }, { where: { id: commentData.commentId } });
            if (updatedCount === 0) { throw new AppError('Update Failed', 400); } else { return response };
        }
    },

    deleteComment: async (commentId, tokenUserId, force) => {
        const foundCommentId = await commentsModel.findOne({
            attributes: ['userId', 'id'],
            where: { id: commentId }
        });

        if (foundCommentId == null) {
            throw new AppError('USER NOT FOUND', 404);
        } else if (foundCommentId.userId != tokenUserId) {
            throw new AppError('You could not delete others user comments.', 400);
        } else {
            if (force === 'true') {
                return await commentsModel.destroy({ where: { commentId }, force: true });
            } else {
                return await commentsModel.destroy({ where: { commentId } });
            }
        }
    }
}