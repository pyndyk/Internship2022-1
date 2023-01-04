const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
const UserModel = require('./model');

dotenv.config();

async function create(req) {
    try {
        const user = new UserModel({
            email: req.email,
            firstName: req.firstName,
            lastName: req.lastName,
            password: req.password,

        });

        await user.save();

        return 'true';
    } catch (error) {
        return 'error';
    }
}

async function putUser(req, name) {
    const user = await UserModel.findOne({ firstName: name });

    if (user.email) {
        user.email = req.email;
        user.firstName = req.firstName;
        user.lastName = req.reqlastName;
        user.password = req.password;
        await user.save();

        return user;
    }

    return 'not found user';
}
async function findUser(queryParam) {
    const user = await UserModel.find({
        firstName: queryParam.name,
    });

    const validPassword = await bcrypt.compare(queryParam.password, user[0].password);

    if (user && validPassword) {
        return user;
    }

    return 'not found user';
}

async function deleteUser(name) {
    const user = await UserModel.deleteOne({ firstName: name });

    if (user) return 'ok';

    return 'user not found';
}
module.exports = {
    create,
    putUser,
    deleteUser,
    findUser,
};