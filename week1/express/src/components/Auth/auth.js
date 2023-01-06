/* eslint-disable no-underscore-dangle */
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../Users/model');

require('dotenv').config();

async function generateAccessToken(req, res) {
    const { userName, password } = req.body;
    const user = await User.findOne({ firstName: userName });

    if (await bcrypt.compare(password, user.password)) {
        const token = jwt.sign({ password: user.password }, 'jfjfjfjfjfjfjfuuuuu', { expiresIn: '180000s' });

        return res.status(200).json({
            jwt_token: token,
        });
    }

    return res.json('password is not valid');
}

async function authenticateToken(req, res, next) {
    try {
        const token = await req.headers.authorization && req.headers.authorization.split(' ')[1];

        if (token == null) return res.sendStatus(401);
        jwt.verify(token, 'jfjfjfjfjfjfjfuuuuu', (err, user) => {
            if (err) return res.sendStatus(403);
            req.password = user.password;
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