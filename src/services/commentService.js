const commentsModel = require('../models/commentsModel');

module.exports = {

    getSingleCommnet: async (id) => {
        return await commentsModel.findOne({ where: { id: id } });
    },

    updateComment: async (data) => {

    },

    deleteComment: async (id) => {

    }

}