/* eslint-disable eol-last */
const { Router } = require('express');

const myToken = require('./middleware');

const myComponent = require('./index');

const router = Router();

router.post('/', myComponent.getToken);
router.post('/account', myToken.authenticateToken, myComponent.getToken);

module.exports = router;