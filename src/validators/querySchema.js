const Joi = require("joi");

const taskSchema = Joi.object({
    id: Joi.number().integer().positive().required()
});

module.exports = taskSchema;