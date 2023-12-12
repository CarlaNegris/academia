const {Client} = require('pg');
const { conexao } = require('../src/conexao')

async function listar() {
    const client = new Client(conexao);
    await client.connect();
    const result = await client.query("SELECT * FROM alunos");
    const listaAlunos = result.rows;
    await client.end();
    return listaAlunos;
}

async function inserir(aluno) {
    const client = new Client(conexao);
    await client.connect();
    const result = await client.query('INSERT INTO alunos(nome) VALUES ($1) RETURNING *',
        [aluno.nome]);
    const alunoInserido = result.rows[0];
    await client.end();
    return alunoInserido;
}

async function buscarPorId(id){
    const cliente = new Client(conexao);
    await cliente.connect();
    const res = await cliente.query('SELECT * FROM alunos WHERE id=$1',[id]);
    const aluno = res.rows[0];
    await cliente.end();
    return aluno;
}

async function atualizar(id, aluno) {
    const sql = 'UPDATE alunos set nome=$1 WHERE id=$2 RETURNING *'
    const values = [aluno.nome, id];
    const cliente = new Client(conexao);
    await cliente.connect();
    const res = await cliente.query(sql,values);
    const alunoAtualizado = res.rows[0];
    await cliente.end();
    return alunoAtualizado;    
}

async function deletar(id) {
    const sql = 'DELETE FROM alunos WHERE id=$1 RETURNING *'
    const values = [id];

    const cliente = new Client(conexao);
    await cliente.connect();
    const res = await cliente.query(sql,values);
    const alunoDeletado = res.rows[0];
    await cliente.end();
    return alunoDeletado;
}

module.exports = {
    listar,
    inserir,
    buscarPorId,
    atualizar,
    deletar
}
