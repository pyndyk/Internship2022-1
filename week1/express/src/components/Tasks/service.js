/* eslint-disable indent */
/* eslint-disable no-underscore-dangle */
/* eslint-disable eol-last */

const jwt = require('jsonwebtoken');
const TaskModel = require('./model');
const UserModel = require('../Users/model');

async function getTasks(req, res) {
    try {
        const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
        const decode = jwt.decode(token);
        const { password } = decode.user;
        const task = await UserModel.aggregate([
            { $match: { password } },
            {
                $lookup: {
                    from: 'tasks',
                    localField: '_id',
                    foreignField: 'assignee',
                    as: 'tasks',
                },
            },
            { $unwind: '$tasks' },
            {
                $facet: {
                    tasks: [{
                            $project: {
                                userName: 1,
                                tasks: 1,
                                _id: 0,
                            },
                        },
                        { $sort: { 'tasks.estimatedTime': -1 } },
                    ],
                    totalTasks: [
                        { $count: 'value' },
                    ],
                    totalEstimation: [{ $group: { _id: null, totalEstimatedTime: { $sum: '$tasks.estimatedTime' } } },
                        {
                            $project: {
                                _id: 0,
                            },
                        }
                    ],
                },
            },

        ]);

        return res.json(task);
    } catch (error) {
        return res.send(' error ');
    }
}
async function getTask(req, res) {
    try {
        const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
        const decode = jwt.decode(token);
        const userId = decode.user._id;

        const url = new URL(`http://localhost/${req.url}`);
        const page = url.searchParams.get('page');
        const array = await TaskModel.find({ assignee: userId }).skip(page * 5).limit(5);
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
        const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
        const decode = jwt.decode(token);
        const userId = decode.user._id;

        const task = await TaskModel.findOne({ assgnee: userId, _id: req.body.id });

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
        const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
        const decode = jwt.decode(token);
        const userId = decode.user._id;

        const task = new TaskModel({
            assignee: userId,
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