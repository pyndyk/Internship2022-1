/* eslint-disable eol-last */
const { Router } = require('express');

const myComponent = require('./auth');

const router = Router();
const verifyToken = require('../../config/verifyToken');

router.post('/', myComponent.userGetToken);
router.post('/account', verifyToken.authenticateToken, myComponent.userGetToken);

module.exports = router;