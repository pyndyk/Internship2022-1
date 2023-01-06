/* eslint-disable no-underscore-dangle */
const myService = require('./service');

async function getTask(req, res) {
    try {
        const task = await myService.getTask(req.password, req.query.page);

        return res.status(200).json({
            task: task.array,
            totalTasks: task.number,
        });
    } catch (error) {
        return res.json(error);
    }
}

async function getTasks(req, res) {
    try {
        const task = await myService.getTasks(req.password);

        return res.status(200).json(task);
    } catch (error) {
        return res.status(404).json('error');
    }
}

async function patch(req, res) {
    try {
        const task = await myService.patch(req.password, req.body._id, req.body.date);

        if (task) return res.status(200).json(task);

        return res.status(404).json('user not found');
    } catch (error) {
        return res.status(500).json(error);
    }
}

async function create(req, res) {
    try {
        const task = await myService.create(req.body, req.password);

        if (task !== 'error') return res.status(200).send(task);

        return res.status(404).json('error');
    } catch (error) {
        return res.status(500).json('error');
    }
}
module.exports = {
    getTask,
    getTasks,
    patch,
    create,
};