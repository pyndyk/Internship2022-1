const Joi = require('joi');

const jwt = require('jsonwebtoken');

const schema = Joi.object().keys({
    id: Joi.number(),
    name: Joi.string(),
});
const schemaQuery = Joi.object().keys({
    id: Joi.number(),
});

function authenticateToken(req, res, next) {
    const authHeader = req.headers.authorization;
    const token = authHeader;

    if (token == null) return res.sendStatus(401);

    jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);

        req.user = user;
    });

    return next();
}
module.exports = {
    schema,
    schemaQuery,
    authenticateToken,
};