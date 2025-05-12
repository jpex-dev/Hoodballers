const {EspacosService} = require("../business/services/EspacosService");
const getEspacos = async (req, res) => {
    const Espacos = new EspacosService();
    try {
        const result = await Espacos.getEspacos();
        res.status(201).json(result);
    } catch (err) {
        res.status(500).json({ message: 'Erro interno no servidor' });
    }
};
const getEspacosByDistrito = async (req, res) => {
    const Espacos = new EspacosService();
    const {distrito} = req.query;
    console.log(distrito);
    try {
        const result = await Espacos.getEspacosByDistrito(distrito);
        res.status(201).json(result);
    } catch (err) {
        res.status(500).json({ message: 'Erro interno no servidor' });
    }
};
const createEspaco = async (req, res) => {
    const Espacos = new EspacosService();
    const  body = req.body;
    try {
        const result = await Espacos.createEspaco(body);
        res.status(201).json(result);
    } catch (err) {
        console.error('Erro no createEspaco:', err.message); // <-- Agora imprime o erro no console
        res.status(500).json({ message: 'Erro interno no servidor', error: err.message });
    }
};
module.exports = { getEspacos,getEspacosByDistrito,createEspaco };
