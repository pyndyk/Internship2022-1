/* eslint-disable no-underscore-dangle */
/* eslint-disable eol-last */

const TaskModel = require('./model');

async function getTasks(req, res) {
    try {
        const newTask = await TaskModel.find();

        newTask.sort((d1, d2) => d2.estimatedTime - d1.estimatedTime);
        const totalTasks = newTask.length;
        const totalEstimation = await TaskModel.aggregate([{
            $group: {
                _id: 1,
                total: {
                    $sum: '$estimatedTime',
                },
            },
        }]);

        return res.send(JSON.stringify({
            task: newTask,
            totalTasks,
            totalEstimation: totalEstimation[0].total,
        }));
    } catch (error) {
        return res.send(' error ');
    }
}
async function getTask(req, res) {
    try {
        const url = new URL(`http://localhost/${req.url}`);
        const page = url.searchParams.get('page');
        const array = await TaskModel.find().skip(page * 5).limit(5);
        const number = (await TaskModel.find()).length;

        return res.send(JSON.stringify({
            code: 200,
            task: array,
            totalTask: number,
        }));
    } catch (error) {
        return res.json(error);
    }
}

async function patch(req, res) {
    try {
        const task = await TaskModel.findOne({ _id: req.body._id });

        if (task && req.body.date) {
            task.estimatedTime = req.body.date;
            await task.save();

            return res.json('true');
        }

        return res.json('task not found');
    } catch (e) {
        return res.json('error');
    }
}

async function create(req, res) {
    try {
        const task = new TaskModel({
            assignee: req.body.id,
            title: req.body.title,
            description: req.body.description,
            estimatedTime: req.body.date,
            createdBy: req.body.createdBy,
        });

        await task.save();

        return res.json('true');
    } catch (error) {
        return 'error';
    }
}
module.exports = {
    create,
    patch,
    getTask,
    getTasks,
};