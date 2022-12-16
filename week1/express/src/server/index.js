const http = require('http');
const server = require('./server');
const events = require('./events');
const base = require('../config/mongoConnection');

base.start();

const PORT = server.get('port');

events.bind(http.createServer(server).listen(PORT));