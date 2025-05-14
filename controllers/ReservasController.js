const {ReservaService} = require("../business/services/ReservasService");

const Reserva = new ReservaService();

const getEstadoReserva = async (req, res) => {
    try {
        const {id_reserva} = req.query;
        const result = await Reserva.getEstadoReserva(id_reserva);
        res.status(201).json(result);
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ message: 'Erro interno no servidor:'+err.message });
    }
};
const createReserva = async (req, res) => {
    try {
        const body = req.body;
        const result = await Reserva.createReserva(body);
        res.status(201).json(result);
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ message: 'Erro interno no servidor:'+err.message });
    }

};
const confirmarReserva = async (req, res) => {
    try {
        const { id_reserva } = req.body;

        if (!id_reserva) {
            return res.status(400).json({ message: "O campo 'id_reserva' é obrigatório." });
        }
        console.log(`ID da reserva: ${id_reserva}`)
        const result = await Reserva.confirmarReserva(id_reserva);
        res.status(201).json(result);
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ message: 'Erro interno no servidor:'+err.message });
    }

};
module.exports = { getEstadoReserva,createReserva,confirmarReserva}