const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const pool = require('../db'); // importa o pool do PostgreSQL

const router = express.Router();
const SECRET_KEY = 'ipca321'; // em produção, use process.env.SECRET_KEY

router.use(bodyParser.json());

router.post('/', async function(req, res) {
    const { email, password } = req.body;

    try {
        const result = await pool.query(
            'SELECT * FROM public."User" WHERE email = $1 AND password = $2',
            [email, password]
        );

        if (result.rows.length > 0) {
            const token = jwt.sign({ email }, SECRET_KEY, { expiresIn: '1h' });
            res.json({ token });
        } else {
            res.status(401).json({ message: 'Credenciais inválidas' });
        }
    } catch (err) {
        console.error('Erro ao autenticar:', err);
        res.status(500).json({ message: 'Erro interno no servidor' });
    }
});

module.exports = router;
