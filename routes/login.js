const express = require('express');
const {loginFunction} = require("../controllers/LoginController"); // importa o pool do PostgreSQL

const login = express.Router();

login.post('/', loginFunction);

module.exports = login;
