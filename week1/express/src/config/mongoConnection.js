const mongoose = require('mongoose');

const DB_URL = 'mongodb+srv://Iryna:2022scorpions@users.kvr04tr.mongodb.net/?retryWrites=true&w=majority';

async function start() {
    await mongoose.connect(DB_URL, { useUnifiedTopology: true, useNewUrlParser: true });

    const db = await mongoose.connection;

    db.on('error', console.error.bind(console, 'connection error: '));
    db.once('open', () => console.log('Connected successfully'));
}

module.exports = {
    start,
};