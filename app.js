const express = require('express');
const cors = require('cors');
const expressJWT = require('express-jwt');
const routes = require('./routes');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());
app.use('/', expressJWT({ secret: process.env.SECRET, algorithms: ['HS256'] }).unless({
    path: ['/about', '/user/register', '/user/authenticate']
}));
app.use(routes);

module.exports = app;