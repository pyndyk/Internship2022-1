const { Router } = require('express');

const myComponent = require('./auth');

const router = Router();

router.post('/sing-in', myComponent.generateAccessToken);
router.post('/account', myComponent.authenticateToken);

module.exports = router;