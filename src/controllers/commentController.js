const commentService = require('../services/commentService');

module.exports = {

     getSingleCommnet: async (req, res) => {
          try {
               const data = await commentService.getSingleCommnet(req.params.id);
               res.status(200).json({ success: true, data: data });
          } catch (error) {
               res.status(400).json({ status: false, message: error.message });
          }
     },

     updateComment: async (req, res) => {
          try {
               const commentData = { ...req.body, userId: req.user.id, commentId: req.params.id };
               const commentUpdated = await commentService.updateComment(commentData);
               res.status(200).json({ success: true, message: 'Comment added successfully', data: commentUpdated });
          } catch (error) {
               res.status(400).json({ status: false, message: error.message });
          }
     },

     deleteComment: async (req, res) => {
          try {
               await commentService.deleteComment(req.params.id,req.user.id);
               res.status(200).json({ success: true, message: 'Comment deleted successfully' });
          } catch (error) {
               res.status(400).json({ status: false, message: error.message });
          }
     }
}