const {EspacosService} = require("../business/services/EspacosService");
const Espacos = new EspacosService();

const getEspacos = async (req, res) => {
    try {
        const result = await Espacos.getEspacos();
        res.status(201).json(result);
    } catch (err) {
        res.status(500).json({ message: 'Erro interno no servidor:'+err.message });
    }
};
const getEspacosByDistrito = async (req, res) => {
    const {distrito} = req.query;
    console.log(distrito);
    try {
        const result = await Espacos.getEspacosByDistrito(distrito);
        res.status(201).json(result);
    } catch (err) {
        res.status(500).json({ message: 'Erro interno no servidor:'+err.message });
    }
};
const createEspaco = async (req, res) => {
    const  body = req.body;
    try {
        const result = await Espacos.createEspaco(body);
        res.status(201).json(result);
    } catch (err) {
        console.error('Erro no createEspaco:', err.message);
        res.status(500).json({ message: 'Erro interno no servidor'+ err.message });
    }
};
module.exports = { getEspacos,getEspacosByDistrito,createEspaco };
