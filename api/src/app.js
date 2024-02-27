const express = require('express');
const mainRoutes = require('./routes/mainRoutes');
const cookieParser = require('cookie-parser');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/", mainRoutes);

module.exports = app;
