const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

// const configRoutes = require('../config/routes.js')
const authenticate = require('../auth/auth-middlware.js')
const authRouter = require('../auth/auth-router.js');
const prodRouter = require('../products/products-router.js')
const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

//configRoutes(server)
server.use('/api/auth', authRouter);
server.use('/api/product', authenticate, prodRouter)
server.get('/', (req, res) => {
    res(200).send('Server Running');
})

module.exports = server;