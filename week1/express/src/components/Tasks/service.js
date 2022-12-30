/* eslint-disable indent */
/* eslint-disable no-underscore-dangle */
/* eslint-disable eol-last */

const TaskModel = require('./model');
const UserModel = require('../Users/model');

async function getTasks(password) {
    try {
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
            { $sort: { 'tasks.estimatedTime': -1 } },
            {
                $facet: {
                    userName: [{
                            $addFields: { userName: { $concat: ['$firstName', ' ', '$lastName'] } },
                        },
                        {
                            $group: {
                                _id: null,
                                userName: { $first: '$userName' },
                            },
                        },
                        { $project: { userName: 1, _id: 0 } },
                    ],
                    tasks: [{
                        $project: {
                            tasks: 1,
                            _id: 0,
                        },

                    }],
                    total: [{
                        $count: 'value',
                    }],
                    totalEstimatedTime: [{
                            $group: { _id: null, totalEstimatedTime: { $sum: '$tasks.estimatedTime' } },
                        },
                        {
                            $project: {
                                _id: 0,
                                totalEstimatedTime: 1,
                            },
                        }
                    ],
                },
            },
        ]);

        return task;
    } catch (error) {
        return 'error';
    }
}

async function getTask(userId, page) {
    try {
        const array = await TaskModel.find({ assignee: userId }).skip(page * 5).limit(5);
        const number = (await TaskModel.find({ assignee: userId })).length;
        const task = {
            array,
            number,
        };

        return task;
    } catch (error) {
        return 'error';
    }
}

async function patch(userId, id, date) {
    try {
        const task = await TaskModel.findOne({ assgnee: userId, _id: id });

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

async function create(body, userId) {
    try {
        const task = new TaskModel({
            assignee: userId,
            title: body.title,
            description: body.description,
            estimatedTime: body.date,
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