const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const pool = require('../db');
const  authMiddleware = require('../business/auth/authmiddleware');
const {getEspacos,getEspacosByDistrito,createEspaco} = require('../controllers/EspacosController');
const espacos = express.Router();


espacos.get('/',authMiddleware, getEspacos);
espacos.get('/getEspacosByDistrito',authMiddleware, getEspacosByDistrito);
espacos.post('/createEspaco',authMiddleware, createEspaco);
module.exports = espacos;
