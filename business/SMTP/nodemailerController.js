const {transporter} = require('../data/nodemailer');

async function enviarEmailConfirmacao(reserva,email) {
    const mailOptions = {
        from: 'geral@jp-systems.pt',
        to: email,
        subject: 'Reserva Confirmada!',
        text: `
            Olá ${reserva.userid},

            Sua reserva para o espaço ${reserva.espacoid_espaco} foi confirmado com sucesso!

            Detalhes da reserva:
            - Data de início: ${new Date(reserva.datahorainicio).toLocaleString()}
            - Data de fim: ${new Date(reserva.datahorafim).toLocaleString()}

            Estado: Confirmado.

            Atenciosamente,
            Equipa de Reservas
        `
    };

    // Enviar o e-mail
    try {
        await transporter.sendMail(mailOptions);
        return true
    } catch (error) {
        console.error('Erro ao enviar e-mail:', error);
        return false;
    }
}

module.exports = {enviarEmailConfirmacao};