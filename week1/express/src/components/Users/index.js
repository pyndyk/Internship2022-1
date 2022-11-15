/* eslint-disable eol-last */
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
        const demo = await myService.create(req.body);

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
async function putUser(req, res) {
    try {
        const demo = await myService.putUser(req.body);

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
async function deleteUser(req, res) {
    try {
        const demo = await myService.deleteUser(req.body);

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
    findAll,
    create,
    putUser,
    deleteUser,
};