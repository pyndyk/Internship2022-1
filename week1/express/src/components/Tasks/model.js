const mongoose = require('mongoose');

const { Schema } = mongoose;

const schemaTask = new Schema({
    assignee: { type: mongoose.Types.ObjectId },
    title: { type: String },
    description: { type: String },
    estimatedTime: { type: Number },
    createdBy: { type: String },
});
const task = mongoose.model('task', schemaTask);

module.exports = task;