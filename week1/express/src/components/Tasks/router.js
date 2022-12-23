/* eslint-disable eol-last */
const { Router } = require('express');

const router = Router();
const taskComponent = require('./service');

router.post('/task', taskComponent.create);
router.patch('/task/:id', taskComponent.patch);
router.get('/task', taskComponent.getTask);
router.get('/tasks/all', taskComponent.getTasks);
module.exports = router;