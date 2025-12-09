const Joi = require('joi');

const createTasksSchema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().allow(''),
    status: Joi.string().valid('todo', 'in-progress', 'done')
});

const signUpSchema = Joi.object({
    name: Joi.string().alphanum().min(3).max(30).required(),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
    password: Joi.string().min(8).max(15).required(),
    role: Joi.string().valid('user', 'admin').required()
});

const loginSchema = Joi.object({
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
    password: Joi.string().min(8).max(15).required(),
});

module.exports = { createTasksSchema, signUpSchema, loginSchema };