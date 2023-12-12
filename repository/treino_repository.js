const {Client} = require('pg');
const { conexao } = require('../src/conexao')

async function listar() {
    const cliente = new Client(conexao)
    await cliente.connect();
    const res = await cliente.query(`SELECT alunos.nome, exercicios.exercicio, exercicios.serie, exercicios.repeticao
        FROM alunos
            INNER JOIN exercicios
        ON alunos.id = exercicios.idaluno`);
    await cliente.end();
    return res.rows;
}

async function buscarPorId(id) {
    const cliente = new Client(conexao);
    try {
        await cliente.connect();
        const res = await cliente.query(`
            SELECT alunos.nome, exercicios.exercicio, exercicios.serie, exercicios.repeticao
            FROM alunos
            INNER JOIN exercicios ON alunos.id = exercicios.idaluno
            WHERE alunos.id = $1`, [id]);
        const treino = res.rows;
        if (treino.length === 0) {
            throw { id: 404, message: `Treino para Aluno ${id} não cadastrado` };
        }
        return treino;
    } catch (error) {
        throw error; 
    } finally {
        await cliente.end();
    }
}

module.exports = {
    listar,
    buscarPorId
}
