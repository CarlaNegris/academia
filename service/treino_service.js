const treinoRepository = require('../repository/treino_repository')

async function listar() {
    return await treinoRepository.listar();
}

async function buscarPorId(id) {
    const treino = await treinoRepository.buscarPorId(id);
    if(treino) {
        return treino;
    }
    else {
        throw { id: 404, message: `Treino para Aluno ${id} não cadastrado` };
    }
}

module.exports = {
    listar,
    buscarPorId
}
