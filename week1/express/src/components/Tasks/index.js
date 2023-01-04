/* eslint-disable no-underscore-dangle */
const myService = require('./service');

async function getTask(req, res) {
    try {
        const task = await myService.getTask(req.user.user._id, req.query.page);

        return res.send(JSON.stringify({
            code: 200,
            task: task.array,
            totalTasks: task.number,
        }));
    } catch (error) {
        return res.json(error);
    }
}

async function getTasks(req, res) {
    try {
        const task = await myService.getTasks(req.user.user.password);

        return res.status(200).json(task);
    } catch (error) {
        return res.status(404).json('error');
    }
}

async function patch(req, res) {
    try {
        const task = await myService.patch(req.user.user._id, req.body.id, req.body.date);

        if (task) return res.status(200).json(task);

        return res.status(404).json('user not found');
    } catch (error) {
        return res.status(500).json(error);
    }
}

async function create(req, res) {
    const task = await myService.create(req.body, req.user.user._id);

    return res.json(task);
}

module.exports = {
    getTask,
    getTasks,
    patch,
    create,
};