// middlewares/authMiddleware.js
const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    console.log(req.headers.authorization?.split(' ')[1]);

    const token = req.headers.authorization?.split(' ')[1]; // Espera o formato: "Bearer <token>"

    if (!token) {
        return res.status(401).json({ message: 'Token não fornecido.' });
    }

    try {
        // Verifica o token com a chave secreta
        const decoded = jwt.verify(token, process.env.SECRETKEY);
        req.user = decoded; // Adiciona os dados do usuário no request
        next(); // Continua para a próxima função
    } catch (error) {
        return res.status(403).json({ message: 'Token inválido.' });
    }
};

module.exports = authMiddleware;
