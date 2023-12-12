const alunoService = require('../service/aluno_service')

async function listar(req, res) {
    const listaAlunos = await alunoService.listar();
    res.json(listaAlunos);
}

async function inserir(req, res) {
    let aluno = req.body;
    try {
      const alunoInserido = await alunoService.inserir(aluno);
      res.status(201).json(alunoInserido)
    }
    catch(err) {
      //id-> 400 / msg -> msg de erro
      res.status(err.id).json({msg: err.message});
    }
}

async function buscarPorId(req, res) {
    const id = +req.params.id;
    try {
      const alu = await alunoService.buscarPorId(id);
      res.json(alu);
    }
    catch(err) {
      //id-> 404 / msg -> msg de erro
      res.status(err.id).json({msg: err.message});
    }
}

async function atualizar (req, res) {
    const id = +req.params.id;
    let aluno = req.body;
    try{ 
      const alunoAtualizado = await alunoService.atualizar(id, aluno);
      res.json(alunoAtualizado);
    }
    catch(err) {
      res.status(err.id).json({msg: err.message});
    }
}

async function deletar(req, res) {
    const id = +req.params.id;
    try{ 
      const alunoDeletado = await alunoService.deletar(id);
      res.json(alunoDeletado);
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