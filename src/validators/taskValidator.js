const Joi = require('joi');

module.exports.createTasksSchema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().allow(''),
    status: Joi.string().valid('todo', 'in-progress', 'done')
});