const commentsModel = require('../models/commentsModel');
const AppError = require('../utils/AppError');

module.exports = {

    getSingleCommnet: async (commentId) => {
        const { id, text, taskId, userId } = await commentsModel.findOne({ where: { id: commentId } });
        return { id, text, taskId, userId };
    },

    updateComment: async (commentData) => {
        //Find out the comment id is available or not;;;
        const foundCommentId = await commentsModel.findOne({
            attributes: ['userId', 'id', 'taskId'],
            where: { id: commentData.commentId }
        });

        if (foundCommentId == null) {
            throw new AppError('You have not comment on your task yet.', 400);
        } else if (foundCommentId.userId != commentData.userId) {
            throw new AppError('You could not comment on others user task.', 400);
        } else {
            const response = {
                id: commentData.commentId, text: commentData.text, taskId: foundCommentId.taskId,
                userId: foundCommentId.userId
            }
            const result = await commentsModel.update({ text: commentData.text }, { where: { id: commentData.commentId } });
            if (result > 0) return response;
        }
    },

    deleteComment: async (commentId, tokenUserId) => {
        const foundCommentId = await commentsModel.findOne({
            attributes: ['userId', 'id'],
            where: { id: commentId }
        });

        if (foundCommentId == null) {
            throw new AppError('USER NOT FOUND', 404);
        } else if (foundCommentId.userId != tokenUserId) {
            throw new AppError('You could not delete others user comments.', 400);
        } else {
            await commentsModel.destroy({ where: { id: commentId } });
        }
    }
}