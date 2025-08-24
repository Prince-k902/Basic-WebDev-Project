const Joi = require('joi');

module.exports.listSchema = Joi.object({
    list: Joi.object({
        title: Joi.string().required(),
        description: Joi.string().required(),
        location: Joi.string().required(),
        country: Joi.string().required(),
        price: Joi.number().min(0).required(),
//         image: Joi.object({
//             url: Joi.string().allow("", null),
//             filename: Joi.string().optional(),
//         }).required(),
    }).required()
});

module.exports.reviewSchema = Joi.object({
    review: Joi.object({
        comment : Joi.string().required(),
        rating : Joi.number().min(1).max(5).required(),
        createdAt : Joi.date().optional()
    }).required()
});
