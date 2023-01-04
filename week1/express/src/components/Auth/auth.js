/* eslint-disable no-underscore-dangle */
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../Users/model');

require('dotenv').config();

console.log(process.env.TOKEN_SECRET);
async function generateAccessToken(req, res) {
    const { userName, password } = req.body;
    const user = await User.findOne({ firstName: userName });

    if (await bcrypt.compare(password, user.password)) {
        const token = jwt.sign({ user }, process.env.TOKEN_SECRET, { expiresIn: '180000s' });

        return res.json({
            jwt_token: token,
        });
    }

    return res.json('password is not valid');
}

async function authenticateToken(req, res, next) {
    try {
        const token = await req.headers.authorization && req.headers.authorization.split(' ')[1];

        if (token == null) return res.sendStatus(401);
        jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
            if (err) return res.sendStatus(403);
            req.user = user;
        });

        return next();
    } catch (e) {
        return res.status(401).send('Invalid Token');
    }
}

module.exports = {
    generateAccessToken,
    authenticateToken,
};