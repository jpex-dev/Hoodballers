const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const pool = require('../db');
const  authMiddleware = require('../business/auth/authmiddleware');
const {getEstadoReserva,createReserva,confirmarReserva} = require('../controllers/ReservasController');
const reservas = express.Router();


// reservas.get('/',authMiddleware, getEspacos);
reservas.get('/getEstadoReserva',authMiddleware, getEstadoReserva);
reservas.post('/createReserva',authMiddleware, createReserva);
reservas.post('/confirmarReserva',authMiddleware, confirmarReserva);
module.exports = reservas;
