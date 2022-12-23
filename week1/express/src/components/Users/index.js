/* eslint-disable eol-last */
const url = require('url');

const myService = require('./service');

async function findUser(req, res) {
    try {
        const demo = await myService.findUser(req.query);

        if (demo !== 'not found user') {
            return res.status(200).json({
                data: demo,
            });
        }

        return 'error';
    } catch (error) {
        return res.status(500).json({
            error: error.message,
            details: null,
        });
    }
}

async function create(req, res) {
    try {
        const demo = await myService.create(req.body);

        if (demo !== 'error') {
            return res.status(201).json({
                data: demo,
            });
        }

        return res.status(404).send('error');
    } catch (error) {
        return res.status(500).json({
            error: error.message,
            details: null,
        });
    }
}
async function putUser(req, res) {
    try {
        const queryObject = url.parse(req.url, true).query;
        const demo = await myService.putUser(req.body, queryObject.name);

        if (demo) {
            return res.status(201).json({
                data: demo,
            });
        }

        return 'user not found';
    } catch (error) {
        return res.status(500).json({
            error: error.message,
            details: null,
        });
    }
}
async function deleteUser(req, res) {
    try {
        const queryObject = url.parse(req.url, true).query;
        const demo = await myService.deleteUser(queryObject.name);

        return res.status(201).json({
            data: demo,
        });
    } catch (error) {
        return res.status(500).json({
            error: error.message,
            details: null,
        });
    }
}

module.exports = {
    findUser,
    create,
    putUser,
    deleteUser,
};