const Joi = require("joi");

const commonHeaderSchema = Joi.object({
    "content-type": Joi.string().valid("application/json").required(),
}).options({ allowUnknown: true });

module.exports = commonHeaderSchema;