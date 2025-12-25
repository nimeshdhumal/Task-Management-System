const Joi = require("joi");

const taskSchema = Joi.object({
    id: Joi.number().integer().positive().required()
});

const paginationSchema = Joi.object({
    page: Joi.number().integer().min(1).default(1).empty(''),
    limit: Joi.number().integer().min(1).default(10).empty(''),
    sort: Joi.string().default('createdAt').empty(''),
    order: Joi.string().valid('desc', 'asc').default('desc').empty(''),
}).unknown(false);

const deleteSchema = Joi.object({
    force: Joi.boolean().default('false'),
});

module.exports = { taskSchema, paginationSchema, deleteSchema };