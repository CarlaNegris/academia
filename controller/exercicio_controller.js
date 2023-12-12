const exercicioService = require('../service/exercicio_service')

async function listar(req, res) {
    const listaExercicio = await exercicioService.listar();
    res.json(listaExercicio);
}

async function inserir(req, res) {
  let exercicio = req.body;
  try {
    const exercInserido = await exercicioService.inserir(exercicio);
    res.status(201).json(exercInserido)
  }
  catch(err) {
    //id-> 400 / msg -> msg de erro
    res.status(err.id).json({msg: err.message});
  }
}

async function buscarPorId(req, res) {
    const id = +req.params.id;
    try {
      const exerc = await exercicioService.buscarPorId(id);
      res.json(exerc);
    }
    catch(err) {
      //id-> 404 / msg -> msg de erro
      res.status(err.id).json({msg: err.message});
    }
}

async function atualizar (req, res) {
    const id = +req.params.id;
    let exercicio = req.body;

    try{ 
      const exercicioAtualizado = await exercicioService.atualizar(id, exercicio);
      res.json(exercicioAtualizado);
    }
    catch(err) {
      res.status(err.id).json({msg: err.message});
    }
}

async function deletar(req, res) {
    const id = +req.params.id;
    try{ 
      const exercicioDeletado = await exercicioService.deletar(id);
      res.json(exercicioDeletado);
    }
    catch(err) {
      res.status(err.id).json({msg: err.message});
    }   
}

module.exports = {
    listar,
    inserir,
    buscarPorId,
    atualizar,
    deletar
}