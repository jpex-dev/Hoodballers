// business/services/LoginService.js
const pool = require("../../db");

class LoginService {
    async login(email, password) {
        try {
            const result = await pool.query(
                'SELECT * FROM public."User" WHERE email = $1 AND password = $2',
                [email, password]
            );
            return result;
        } catch (err) {
            console.error('Erro ao buscar usuário:', err);
            throw new Error('Erro ao buscar usuário');
        }
    }
}

module.exports = {LoginService};
