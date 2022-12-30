/* eslint-disable eol-last */
const jwt = require('jsonwebtoken');

async function authenticateToken(req, res, next) {
    const token = await req.headers.authorization;

    if (token == null) return res.sendStatus(401);

    jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);

        req.user = user;
    });

    return next();
}
module.exports = { authenticateToken };