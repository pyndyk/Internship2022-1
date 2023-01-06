/* eslint-disable no-underscore-dangle */

const dotenv = require('dotenv');

dotenv.config();
const TaskModel = require('./model');
const UserModel = require('../Users/model');

async function getTasks(password) {
    try {
        const task = await UserModel.aggregate([{ $match: { password } },
            {
                $lookup: {
                    from: 'tasks',
                    localField: '_id',
                    foreignField: 'assignee',
                    as: 'tasks',
                },
            },
            {
                $unwind: '$tasks',
            },
            {
                $sort: { 'tasks.estimatedTime': -1 },
            },
            {
                $group: {
                    _id: '$_id',
                    firstName: { $first: '$firstName' },
                    lastName: { $first: '$lastName' },
                    tasks: { $push: '$tasks' },
                },
            },
            {
                $project: {
                    name: {
                        $concat: ['$firstName', ' ', '$lastName'],
                    },
                    totalTasks: { $size: '$tasks' },
                    totalEstimation: {
                        $sum: {
                            $sum: '$tasks.estimatedTime',
                        },
                    },
                    tasks: 1,
                    _id: 0,
                },
            },
        ]);

        return task;
    } catch (error) {
        return 'error';
    }
}

async function getTask(password, page) {
    try {
        const user = await UserModel.find({ password });

        const array = (await TaskModel.find({ assignee: user._id })).splice((page - 1) * 5, 5);
        const number = (await TaskModel.find({ assignee: user._id })).length;
        const task = {
            array,
            number,
        };

        return task;
    } catch (error) {
        return 'error';
    }
}

async function patch(password, id, date) {
    try {
        const user = await UserModel.findOne({ password });
        const task = await TaskModel.findOne({ assignee: user._id, _id: id });

        if (task && date) {
            task.estimatedTime = date;
            await task.save();

            return task;
        }

        return 'error';
    } catch (e) {
        return 'error';
    }
}

async function create(body, password) {
    try {
        const user = await UserModel.findOne({ password });
        const task = new TaskModel({
            assignee: user._id,
            title: body.title,
            description: body.description,
            estimatedTime: body.estimatedTime,
            createdBy: body.createdBy,
        });

        await task.save();

        return task;
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