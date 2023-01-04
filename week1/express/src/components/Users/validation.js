const Joi = require('joi');

const schema = Joi.object().keys({
    email: Joi.string(),
    firstName: Joi.string(),
    lastName: Joi.string(),
    password: Joi.string(),
});
const schemaQuery = Joi.object().keys({
    name: Joi.string(),
});

module.exports = {
    schema,
    schemaQuery,
};