const commentService = require('../services/comment.service');
const buildActor = require('../utils/actor.util');
const meta = null;

module.exports = {

     getSingleCommnet: async (req, res) => {
          try {
               const actor = buildActor(req);
               const data = await commentService.getSingleComment(actor.id,actor.userId,actor.userRole);
               res.status(200).json({ success: true, data: data, meta });
          } catch (error) {
               res.status(400).json({ status: false, message: error.message });
          }
     },

     updateComment: async (req, res) => {
          try {
               const actor = buildActor(req);
               const commentData = { ...actor.body, userId: actor.userId, commentId: actor.id };
               const commentUpdated = await commentService.updateComment(commentData);
               res.status(200).json({ success: true, message: 'Comment added successfully', data: commentUpdated, meta });
          } catch (error) {
               res.status(400).json({ status: false, message: error.message });
          }
     },

     deleteComment: async (req, res) => {
          try {
               const actor = buildActor(req);
               await commentService.deleteComment(actor.id, actor.userId);
               res.status(200).json({ success: true, message: 'Comment deleted successfully', meta });
          } catch (error) {
               res.status(400).json({ status: false, message: error.message });
          }
     }
}