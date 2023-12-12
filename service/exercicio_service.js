const exercicioRepository = require('../repository/exercicio_repository')

async function listar() {
    return await exercicioRepository.listar();
}

async function exerc(){
    return await exercicioRepository.exerc();
}

async function inserir(exercicio) {
    if(exercicio && exercicio.exercicio && exercicio.serie && exercicio.repeticao && exercicio.idaluno ) {// exercicio != undefined
        return await exercicioRepository.inserir(exercicio);
    }
    else {
        throw {id:400, message:"Erro ao Cadastrar Exercicio"};
    }
}

async function buscarPorId(id) {
    const exercicio = await exercicioRepository.buscarPorId(id);
    if(exercicio) {
        return exercicio;
    }
    else {
        throw {id:404, message:"Exercicio nao encontrado"};
    }
}

async function atualizar(id, exercicioAtualizado) {
    const exercicio = await exercicioRepository.buscarPorId(id);
    if(!exercicio) {
        throw {id: 404, message: "Exercicio nao encontrado"};
    }
    
    if(exercicioAtualizado && exercicioAtualizado.exercicio && exercicioAtualizado.serie && exercicioAtualizado.repeticao && exercicioAtualizado.idaluno){
        return await exercicioRepository.atualizar(id, exercicioAtualizado);
    }
    else {
        throw {id: 400, message: "Exercicio preencher campos obrigatorios"};
    }
}

async function deletar(id) {
    const exercicioDeletado = await exercicioRepository.deletar(id);
    if(exercicioDeletado){
        return exercicioDeletado;
    }
    else {
        throw {id: 404, message: "Exercicio nao encontrado"};
    }
}

module.exports = {
    listar,
    exerc,
    inserir,
    buscarPorId,
    atualizar,
    deletar
}
