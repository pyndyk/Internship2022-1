/* eslint-disable no-plusplus */
/* eslint-disable no-trailing-spaces */
/* eslint-disable eqeqeq */
/* eslint-disable eol-last */
const users = [];

function findAll() {
    return users;
}

/**
 *  Leave create service method for future, when we will connect mongo,
 *  we will do manipulations here
 */
function create(str) {
    if (str) {
        users.push(str);

        return users;
    }

    return [];
}

function putUser(str, idUser) {
    for (let i = 0; i < users.length; i++) {
        if (users[i].id == idUser) {
            users[i] = str;

            return users;
        }
    }

    return users;
}

function deleteUser(str) {
    for (let i = 0; i < users.length; i++) {
        if (users[i].id == str) {
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
};