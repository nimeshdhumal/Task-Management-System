const commentsModel = require('../models/commentsModel');

module.exports = {

    getSingleComment: async (id) => {
        const commentReceived = await commentsModel.findOne({ where: { id: id } });
        console.log(commentReceived);
    }

}