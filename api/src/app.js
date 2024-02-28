const express = require('express');
const mainRoutes = require('./routes/mainRoutes');
const cookieParser = require('cookie-parser');
const proxy = require('express-http-proxy');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api", mainRoutes);
app.use('/', proxy('http://localhost:3500'));

module.exports = app;
