const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const pool = require('../db');
const  authMiddleware = require('../business/auth/authmiddleware');
const {getEspacos,getEspacosByDistrito,createEspaco} = require('../controllers/EspacosController');
const reservas = express.Router();


// reservas.get('/',authMiddleware, getEspacos);
reservas.get('/getEspacosByDistrito',authMiddleware, getEspacosByDistrito);
reservas.post('/createEspaco',authMiddleware, createEspaco);
module.exports = reservas;
