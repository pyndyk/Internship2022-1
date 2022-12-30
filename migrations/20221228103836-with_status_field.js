/* eslint-disable linebreak-style */
// const TaskModel = require('../week1/express/src/components/Tasks/model');

async function up(db) {
    db.collection('tasks').updateMany({ estimatedTime: { $gt: 10 } }, {
        $set: {
            status: 'done',
        },
    });
    db.collection('tasks').updateMany({ estimatedTime: { $lte: 10 } }, {
        $set: {
            status: 'in progress',
        },
    });

    return db.collection('tasks');
}
//
async function down(db) {
    return db.collection('tasks').updateMany({}, { $unset: { status: null } });
}

module.exports = {

    up,

    down,

};