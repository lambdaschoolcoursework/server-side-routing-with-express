const express = require('express');
const router = require('../posts/router');
const cors = require('cors');

const server = express();
server.use(express.json());
server.use(cors());

server.get('/', (request, response) => {
    response.send({message: 'router is working'});
});

server.use('/api/posts', router);

module.exports = server;