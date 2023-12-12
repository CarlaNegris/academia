const alunoRepository = require('../repository/aluno_repository')

async function listar() {
    return await alunoRepository.listar();
}

async function inserir(aluno) {
    if(aluno && aluno.nome) {// aluno != undefined
        return await alunoRepository.inserir(aluno);
    }
    else {
        throw {id:400, message:"Erro ao Cadastrar Aluno"};
    }
}

async function buscarPorId(id) {
    const aluno = await alunoRepository.buscarPorId(id);
    if(aluno) {
        return aluno;
    }
    else {
        throw {id:404, message:"Aluno nao encontrado"};
    }
}

async function atualizar(id, alunoAtualizado) {
    const aluno = await alunoRepository.buscarPorId(id);
    if(!aluno) {
        throw {id: 404, message: "Aluno nao encontrado"};
    }
    
    if(alunoAtualizado && alunoAtualizado.nome){
        return await alunoRepository.atualizar(id, alunoAtualizado);
    }
    else {
        throw {id: 400, message: "Aluno preencher campos obrigatorios"};
    }
}

async function deletar(id) {
    const alunoDeletado = await alunoRepository.deletar(id);
    if(alunoDeletado){
        return alunoDeletado;
    }
    else {
        throw {id: 404, message: "Aluno nao encontrado"};
    }
}

module.exports = {
    listar,
    inserir,
    buscarPorId,
    atualizar,
    deletar
}