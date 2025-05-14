const pool = require("../../db");
const { v4:uuidv4 } = require("uuid");
const {enviarEmailConfirmacao} = require("../SMTP/nodemailerController");
class ReservaService {
    async getEstadoReserva(id_reserva) {
        try {
            const result = await pool.query(
                'select e.estadoid from public."reserva" r join public."estado" e on r.estado = e.valor where id_reserva = $1',
                [id_reserva],
            );
            return result.rows[0];
        }
        catch (error) {
            console.error('Erro a procurar espaços:', err);
            throw new Error('Erro a procurar espaços:');
        }
    }

    async createReserva(body) {
        const { espaco, data_inicio, data_fim, user_id } = body;

        // Datas atuais e de reserva
        const now = new Date();
        const startDate = new Date(data_inicio);
        const endDate = new Date(data_fim);

        // Validações de datas
        const twelveHoursInMs = 12 * 60 * 60 * 1000;

        if (startDate - now < twelveHoursInMs) {
            return { message: "A reserva tem de ser feita com, pelo menos, 12 horas de antecedência." };
        }

        if (endDate <= startDate) {
            return { message: "A data de fim deve ser superior à data de início." };
        }

        try {
            // Verificar se existe uma reserva para o mesmo espaço e horário
            const conflictCheck = await pool.query(
                `SELECT 1 
             FROM public."reserva" 
             WHERE espacoid_espaco = $1 AND (
                 ($2, $3) OVERLAPS (datahorainicio, datahorafim)
             )`,
                [espaco, startDate, endDate]
            );

            if (conflictCheck.rowCount > 0) {
                return { message: "Já existe uma reserva para este espaço e horário." };
            }

            const id_reserva = uuidv4();
            const estadoid = 2; // Estado "Em Análise"

            const result = await pool.query(
                `INSERT INTO public."reserva" (id_reserva, espacoid_espaco, datahorainicio, datahorafim, userid, estado,createdat)
             VALUES ($1, $2, $3, $4, $5, $6, $7)
             RETURNING *`,
                [id_reserva, espaco, startDate, endDate, user_id, estadoid,now]
            );

            return result.rows[0];
        } catch (error) {
            console.error('Erro ao criar reserva:', error);
            throw new Error('Erro ao criar reserva.');
        }
    }
    async confirmarReserva(id_reserva) {
        try {

            // Verificar se a reserva existe
            const reservaExistente = await pool.query(
                `SELECT * FROM public."reserva" WHERE id_reserva = $1`,
                [id_reserva]
            );

            if (reservaExistente.rowCount === 0) {
                return { message: "Reserva não encontrada." };
            }

//update
            const result = await pool.query(
                `UPDATE public."reserva"
             SET estado = 1
             WHERE id_reserva = $1
             RETURNING *`,
                [id_reserva]
            );
            const reserva = reservaExistente.rows[0];
            console.log(reserva)


            //procurar email do cliente
            const email = await pool.query(
                `Select email from public."User"
             WHERE id_user = $1`,
                [reserva.userid]
            );
            console.log("email",email.rows[0].email);
            const emailuser = email.rows[0].email
            const emailEnviado = await enviarEmailConfirmacao(reserva,emailuser)

            return {
                message: "Reserva confirmada com sucesso.",
                emailEnviado:emailEnviado
            };
        } catch (error) {
            console.error('Erro ao confirmar reserva:', error);
            throw new Error('Erro ao confirmar reserva.');
        }
    }
}

module.exports = {ReservaService};
