const http = require('http');

const server = require('./server');

const events = require('./events');

const users = require('./users');

const PORT = server.get('port');

server.use('/', users);

events.bind(http.createServer(server).listen(PORT));