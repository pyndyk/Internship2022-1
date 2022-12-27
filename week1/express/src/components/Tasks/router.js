/* eslint-disable eol-last */
const { Router } = require('express');

const router = Router();
const taskComponent = require('./service');
const userToken = require('../Auth/auth');

router.post('/task', userToken.authenticateToken, taskComponent.create);
router.patch('/task/:id', userToken.authenticateToken, taskComponent.patch);
router.get('/task', userToken.authenticateToken, taskComponent.getTask);
router.get('/tasks/all', userToken.authenticateToken, taskComponent.getTasks);
module.exports = router;