const Joi = require('joi');

const listSchema = Joi.object({
    list: Joi.object({
        title: Joi.string().required(),
        description: Joi.string().required(),
        location: Joi.string().required(),
        country: Joi.string().required(),
        price: Joi.number().min(0).required(),
        image: Joi.object({
            url: Joi.string().allow("", null),
            filename: Joi.string().optional()
        }).optional()
    }).required()
});

module.exports = listSchema;