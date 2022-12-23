/* eslint-disable eol-last */
const jwt = require('jsonwebtoken');
const Users = require('../Users/model');

async function getToken(line) {
    const user = await Users.find((el) => (el.id === line.id && el.name === line.name));

    if (user) {
        const token1 = jwt.sign(line, process.env.TOKEN_SECRET, { expiresIn: '1800s' });

        return token1;
    }

    return undefined;
}
async function userGetToken(req, res) {
    if (req.body) {
        const user = await getToken(req.body);

        return res.json({ token: `${user}` });
    }

    return res.json(' not data');
}

module.exports = {
    userGetToken,
};