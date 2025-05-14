var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('dotenv').config();

var indexRouter = require('./routes/index');
var loginRouter = require('./routes/login');
var espacosRouter = require('./routes/espacos');
var reservasRouter = require('./routes/reservas');


var app = express();

console.log("Chave secreta carregada no app.js:", process.env.SECRETKEY);
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/login', loginRouter);
app.use('/espacos', espacosRouter);
app.use('/reservas', reservasRouter);

module.exports = app;
