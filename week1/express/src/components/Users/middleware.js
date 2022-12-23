/* eslint-disable eol-last */
const url = require('url');

const validation = require('./validation');

const { schema } = validation;
const { schemaQuery } = validation;

async function validationReqBody(req, res, next) {
    const result = await schema.validate(req.body);
    const { error } = result;
    const valid = error == null;

    console.log(valid);
    if (valid) return next();

    return res.status(400).send(error.details[0].message);
}

async function validationReqBodyAndQuery(req, res, next) {
    const queryObject = await url.parse(req.url, true).query;
    const result = await schema.validate(req.body);
    const result2 = await schemaQuery.validate(queryObject);

    const { error } = (result && result2);

    const valid = error == null;

    if (valid) return next();

    return res.status(400).send(error.details[0].message);
}

async function validationQuery(req, res, next) {
    const queryObject = url.parse(req.url, true).query;
    const result = await schemaQuery.validate(queryObject);
    const { error } = result;
    const valid = error == null;

    if (valid) return next();

    return res.status(400).send(error.details[0].message);
}

module.exports = {
    validationQuery,
    validationReqBodyAndQuery,
    validationReqBody,
};