const pool = require( "../../db");
const { v4:uuidv4 } = require("uuid");
const DISTRITOS_PORTUGAL = require ('../data/data')

class EspacosService {
    async getEspacos() {
        try {
            const result = await pool.query(
                'SELECT * FROM public."espaco"',
            );
            return result.rows;
        }

        catch (error) {
            console.error('Erro a procurar espaços:', err);
            throw new Error('Erro a procurar espaços:');
        }

    }
    async getEspacosByDistrito(distrito) {
        try {
            const result = await pool.query(
                'SELECT * FROM public."espaco" where distrito = $1 ',[distrito]
            );
            return result.rows;
        }

        catch (error) {
            console.error('Erro a procurar espaços:', err);
            throw new Error('Erro a procurar espaços:');
        }

    }
    async createEspaco(body) {
        const { nome, morada, distrito } = body;
        const id_espaco = uuidv4();

        if (!DISTRITOS_PORTUGAL.includes(distrito)) {
            throw new Error(`Distrito inválido: ${distrito}. Os distritos válidos são: ${DISTRITOS_PORTUGAL.join(', ')}`);
        }

        const existingEspaco = await pool.query(
            'SELECT * FROM public."espaco" WHERE morada = $1',
            [morada]
        );

        if (existingEspaco.rows.length > 0) {
            throw new Error(`Já existe um espaço com a morada: ${morada}`);
        }

        try {


            const result = await pool.query(
                `INSERT INTO public."espaco" (id_espaco, nome, morada, distrito)
             VALUES ($1, $2, $3, $4) RETURNING *`,
                [id_espaco, nome, morada, distrito]
            );

            return result.rows[0];

        } catch (err) {
            console.error('Erro ao criar espaço:', err.message);
            throw new Error('Erro ao criar espaço');
        }
    }

}

module.exports = {EspacosService};
