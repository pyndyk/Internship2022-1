/* eslint-disable eol-last */
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
const Users = require('./model');

dotenv.config();

async function create(req) {
    try {
        await Users.create({
            email: req.email,
            firstName: req.firstName,
            lastName: req.lastName,
            password: req.password,
        });

        return 'true';
    } catch (error) {
        return 'error';
    }
}

async function getToken(line) {
    const user = await Users.find((el) => (el.id === line.id && el.name === line.name));

    if (user) {
        const token1 = jwt.sign(line, process.env.TOKEN_SECRET, { expiresIn: '1800s' });

        return token1;
    }

    return undefined;
}

async function putUser(user, name) {
    const userPut = await Users.findOne({ firstName: name });

    if (userPut.email) {
        userPut.email = user.email;
        userPut.firstName = user.firstName;
        userPut.lastName = user.lastName;
        userPut.password = user.password;
        await userPut.save();

        return userPut;
    }

    return 'not found user';
}
async function findUser(queryParam) {
    const user = await Users.find({
        firstName: queryParam.name,
    });

    const validPassword = await bcrypt.compare(queryParam.password, user[0].password);

    if (user && validPassword) {
        return user;
    }

    return 'not found user';
}

async function deleteUser(name) {
    const user = await Users.deleteOne({ firstName: name });

    if (user) return 'ok';

    return 'user not found';
}
module.exports = {
    create,
    putUser,
    deleteUser,
    getToken,
    findUser,
};