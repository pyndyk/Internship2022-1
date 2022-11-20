const users = [{
    id: 1,
    name: 'Pop',
}, {
    id: 2,
    name: 'TOy',
}];
const jwt = require('jsonwebtoken');

const dotenv = require('dotenv');

dotenv.config();

function findAll() {
    return users;
}

/**
 *  Leave create service method for future, when we will connect mongo,
 *  we will do manipulations here
 */

function create(str) {
    users.push(str);

    return users;
}

function getToken(line) {
    const user = users.find((el) => (el.id === line.id && el.name === line.name));

    if (user) {
        const token1 = jwt.sign(line, process.env.TOKEN_SECRET, { expiresIn: '1800s' });

        return token1;
    }

    return undefined;
}

function putUser(str, idUser) {
    console.log(idUser);
    console.log(str);

    for (let i = 0; i < users.length; i += 1) {
        if (users[i].id.toString() === idUser) {
            users[i] = str;

            break;
        }
    }

    return users;
}

function deleteUser(str) {
    for (let i = 0; i < users.length; i += 1) {
        if (users[i].id.toString() === str) {
            users.splice(i, 1);
            break;
        }
    }

    return users;
}
module.exports = {
    create,
    findAll,
    putUser,
    deleteUser,
    getToken,
};