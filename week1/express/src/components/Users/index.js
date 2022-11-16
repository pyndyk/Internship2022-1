/* eslint-disable use-isnan */
/* eslint-disable eqeqeq */
/* eslint-disable eol-last */
const url = require('url');
const myService = require('./service');

async function findAll(req, res) {
    try {
        const demo = await myService.findAll();

        return res.status(200).json({
            data: demo,
        });
    } catch (error) {
        return res.status(500).json({
            error: error.message,
            details: null,
        });
    }
}

async function create(req, res) {
    try {
        if (Object.keys(req.body).length != 0) {
            const demo = await myService.create(req.body);

            return res.status(201).json({
                data: demo,
            });
        }

        return res.status(400).send('no data');
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

        if (queryObject.id) {
            const demo = await myService.putUser(req.body, queryObject.id);

            return res.status(201).json({
                data: demo,
            });
        }

        return res.status(400).send('user not found');
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

        if (queryObject.id) {
            const demo = await myService.deleteUser(queryObject.id);

            return res.status(201).json({
                data: demo,
            });
        }

        return res.status(400).send('user not found');
    } catch (error) {
        return res.status(500).json({
            error: error.message,
            details: null,
        });
    }
}
module.exports = {
    findAll,
    create,
    putUser,
    deleteUser,
};