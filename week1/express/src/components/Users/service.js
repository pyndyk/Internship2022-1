const users = [];

function findAll() {
    try {
        if (users) {
            return users;
        }

        return users;
    } catch (e) {
        return console.log(e);
    }
}

/**
 *  Leave create service method for future, when we will connect mongo,
 *  we will do manipulations here
 */
function create(str) {
    try {
        if (str) {
            users.push(str.user);

            return users;
        }

        return [];
    } catch (e) {
        return console.log(e);
    }
}

function putUser(str) {
    try {
        if (str.user) {
            const index = users.indexOf(str.user);

            users[index] = str.new_user;

            return users;
        }

        return users;
    } catch (e) {
        return console.log(e);
    }
}

function deleteUser(str) {
    try {
        if (str.user) {
            users.splice(users.indexOf(str.user), 1);

            return users;
        }

        return users;
    } catch (e) {
        return console.log(e);
    }
}
module.exports = {
    create,
    findAll,
    putUser,
    deleteUser,
};