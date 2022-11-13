const express = require('express');
const http = require('http');

console.log(' M 1 2 ');
// ROUTERS
const DemoRouter = require('../components/Users/router');

module.exports = {
    init(app) {
        const router = express.Router();

        app.use('/', DemoRouter);

        app.use((req, res) => {
            res.status(404).send(http.STATUS_CODES[404]);
        });

        app.use(router);
    },
};