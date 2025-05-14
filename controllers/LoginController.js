// controllers/loginController.js
const jwt = require("jsonwebtoken");
const {LoginService} = require("../business/services/LoginService");

const loginFunction = async (req, res) => {
    const loginService = new LoginService();
    const { email, password } = req.body;
    const SECRET_KEY = process.env.SECRETKEY;

    try {
        const result = await loginService.login(email, password);

        if (result.rows.length <= 0) {
            res.status(401).json({ message: 'Credenciais inválidas' });
            return;
        }

        const token = jwt.sign({ email }, SECRET_KEY, { expiresIn: '1h' });
        res.status(201).json({ token });

    } catch (err) {
        console.error('Erro ao autenticar:', err);
        res.status(500).json({ message: 'Erro interno no servidor'+err.message });
    }
};

module.exports = { loginFunction };
