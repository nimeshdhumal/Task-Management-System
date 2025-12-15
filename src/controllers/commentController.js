const commentService = require('../services/commentService');

module.exports = {

    getSingleCommnet: async(req,res) => {
        commentService.getSingleComment(req.params.id);
        console.log(req.params.id);
    },

    

}