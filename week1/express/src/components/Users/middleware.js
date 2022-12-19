/* eslint-disable eol-last */
const url = require('url');

const Joi = require('joi');

const jwt = require('jsonwebtoken');

const schema = Joi.object().keys({
    email: Joi.string(),
    firstName: Joi.string(),
    lastName: Joi.string(),
    password: Joi.string(),
});
const schemaQuery = Joi.object().keys({
    name: Joi.string(),
});

function validationReqBody(req, res, next) {
    console.log('P 1');
    const result = schema.validate(req.body);
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

function validationQuery(req, res, next) {
    const queryObject = url.parse(req.url, true).query;
    const result = schemaQuery.validate(queryObject);
    const { error } = result;
    const valid = error == null;

    if (valid) return next();

    return res.status(400).send(error.details[0].message);
}

function authenticateToken(req, res, next) {
    const authHeader = req.headers.authorization;
    const token = authHeader;

    if (token == null) return res.sendStatus(401);

    jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);

        req.user = user;

        return undefined;
    });

    return next();
}
module.exports = {
    validationQuery,
    validationReqBodyAndQuery,
    authenticateToken,
    validationReqBody,
};