const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
const Users = require('./model');

dotenv.config();

async function create(req) {
    try {
        const salt = await bcrypt.genSalt(10);

        Users.create({
            email: req.email,
            'first-name': req['first-name'],
            'second-name': req['second-name'],
            password: await bcrypt.hash(req.password, salt),
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
    const userPut = await Users.findOne({ 'first-name': name });

    if (userPut.email) {
        userPut.email = user.email;
        userPut['first-name'] = user['first-name'];
        userPut['second-name'] = user['second-name'];
        userPut.password = user.password;
        await userPut.save();

        return userPut;
    }

    return 'not found user';
}
async function findUser(queryParam) {
    const user = await Users.find({
        'first-name': queryParam.name,
    });

    const validPassword = await bcrypt.compare(queryParam.password, user[0].password);

    if (user && validPassword) {
        return user;
    }

    return 'not found user';
}

async function deleteUser(name) {
    const user = await Users.deleteOne({ 'first-name': name });

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