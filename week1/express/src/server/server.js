const express = require('express');

console.log(' M 1');
const middleware = require('../config/middleware');

console.log(' M 2');
const router = require('../config/router');

console.log(' M 3');
const app = express();

console.log(' M 4');
middleware.init(app);

console.log(' M 5');
router.init(app);

console.log(' M 6');
app.set('port', process.env.PORT || 3000);

module.exports = app;