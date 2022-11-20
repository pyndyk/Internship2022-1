/* eslint-disable eol-last */
const express = require('express');
const http = require('http');

// const Joi = require('joi');
// ROUTERS

const DemoRouter = require('../components/Demo/router');
const myRouter = require('../components/Users/router');
const myToken = require('../components/Users/myToken');

module.exports = {
    init(app) {
        const router = express.Router();

        app.use('/v1/demo', DemoRouter);
        app.use('/users', myRouter);
        app.use('/singIn', myToken);
        app.use((req, res) => {
            res.status(404).send(http.STATUS_CODES[404]);
        });

        app.use(router);
    },
};