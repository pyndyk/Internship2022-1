const express = require('express');

const app = express();

const urlencodedParser = express.urlencoded({ extended: false });

const users = ['Iryna', 'Roman', 'Michailo'];
const bodyParser = require('body-parser');

app.use(bodyParser.json());

app.get('/', urlencodedParser, async(req, res) => {
    try {
        if (users) {
            return res.send(JSON.stringify(users));
        }

        return res.status(400).send('user not found');
    } catch (e) {
        return console.log(e);
    }
});

app.post('/', urlencodedParser, async(req, res) => {
    try {
        if (req.body) {
            users.push(req.body.user);

            return res.send(JSON.stringify(users));
        }

        return res.status(400).send('error');
    } catch (e) {
        return console.log(e);
    }
});

app.put('/', async(req, res) => {
    try {
        if (req.body.user) {
            const index = users.indexOf(req.body.user);

            users[index] = req.body.new_user;

            return res.send(JSON.stringify(users));
        }

        return res.status(400).send('user not found');
    } catch (e) {
        return console.log(e);
    }
});
app.delete('/', async(req, res) => {
    try {
        if (req.body.user) {
            users.splice(users.indexOf(req.body.user), 1);

            return res.send(JSON.stringify(users));
        }

        return res.status(400).send('user not found');
    } catch (e) {
        return console.log(e);
    }
});
module.exports = app;