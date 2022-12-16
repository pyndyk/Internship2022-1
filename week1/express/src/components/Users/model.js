const mongoose = require('mongoose');

mongoose.set('strictQuery', true);

const { Schema } = mongoose;

const schemaUser = new Schema({
    email: {
        type: String,
        unique: true,
    },
    'first-name': { type: String },
    'second-name': { type: String },
    password: { type: String },
});

const user = mongoose.model('user', schemaUser);

user.createIndexes({ email: 1 });

module.exports = user;