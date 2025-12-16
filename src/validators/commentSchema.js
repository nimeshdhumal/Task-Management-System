const Joi = require('joi');

const commentSchema = Joi.object({
    text: Joi.string().required(),
});

module.exports = commentSchema;