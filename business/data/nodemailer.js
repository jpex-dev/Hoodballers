const nodemailer = require('nodemailer');

// Configuração do transportador SMTP
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'geral@jp-systems.pt',
        pass: process.env.PASSKEY
    },
    tls: {
        rejectUnauthorized: false
    }
});


module.exports = {transporter};