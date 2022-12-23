/* eslint-disable eol-last */
const express = require('express');
const http = require('http');

// const Joi = require('joi');
// ROUTERS

const DemoRouter = require('../components/Demo/router');
const UserRouter = require('../components/Users/router');
const AuthToken = require('../components/Auth/myToken');
const TasksRouter = require('../components/Tasks/router');

module.exports = {
    init(app) {
        const router = express.Router();

        app.use('/v1/demo', DemoRouter);
        app.use('/users', UserRouter);
        app.use('/auth', AuthToken);
        app.use('/v1', TasksRouter);
        app.use((req, res) => {
            res.status(404).send(http.STATUS_CODES[404]);
        });

        app.use(router);
    },
};