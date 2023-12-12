const treinoService = require('../service/treino_service')

async function listar(req, res) {
    const listaTreino = await treinoService.listar();
    res.json(listaTreino);
}

async function buscarPorId(req, res) {
    const id = +req.params.id;
    try {
      const trei = await treinoService.buscarPorId(id);
      res.json(trei);
    }
    catch(err) {
      //id-> 404 / msg -> msg de erro
      res.status(err.id).json({msg: err.message});
    }
}

module.exports = {
    listar,
    buscarPorId
}
