const {Client} = require('pg');
const { conexao } = require('../src/conexao')

async function listar() {
    const cliente = new Client(conexao)
    await cliente.connect();
    const res = await cliente.query(`SELECT distinct exercicio FROM exercicios`);
    await cliente.end();
    return res.rows;
}

// Function validade se idaluno consta no banco
async function validarIdAluno(idaluno) {
    const client = new Client(conexao);
    await client.connect();
    
    try {
        const result = await client.query('SELECT COUNT(*) FROM alunos WHERE id = $1', [idaluno]);
        const alunoExists = result.rows[0].count > 0;
        return alunoExists;
    } finally {
        await client.end();
    }
}

async function inserir(exercicio) {
    const client = new Client(conexao);
    await client.connect();

    try {
        const alunoExists = await validarIdAluno(exercicio.idaluno);
        if (!alunoExists) {
            throw { id: 400, message: `Aluno com ID ${exercicio.idaluno} não cadastrado` };
        }

        const result = await client.query('INSERT INTO exercicios(exercicio, serie, repeticao, idaluno) VALUES ($1, $2, $3, $4) RETURNING *',
            [exercicio.exercicio, exercicio.serie, exercicio.repeticao, exercicio.idaluno]);

        const exercicioInserido = result.rows[0];
        return exercicioInserido;
    } finally {
        await client.end();
    }
}

async function buscarPorId(id){
    const cliente = new Client(conexao);
    await cliente.connect();
    const res = await cliente.query(`SELECT exercicios.id, exercicios.idaluno, exercicios.exercicio, exercicios.serie, exercicios.repeticao 
                                        FROM exercicios WHERE id=$1`,[id]);
    const exercicio = res.rows[0];
    await cliente.end();
    return exercicio;
}

async function atualizar(id, exercicio) {
    const sql = 'UPDATE exercicios set exercicio=$1, serie=$2, repeticao=$3, idaluno=$4 WHERE id=$5 RETURNING *'
    const values = [exercicio.exercicio, exercicio.serie, exercicio.repeticao, exercicio.idaluno, id];
    
    const cliente = new Client(conexao);
    await cliente.connect();
    const res = await cliente.query(sql,values);
    const exercicioAtualizado = res.rows[0];
    await cliente.end();
    return exercicioAtualizado;    
}

async function deletar(id) {
    const sql = 'DELETE FROM exercicios WHERE id=$1 RETURNING *'
    const values = [id];

    const cliente = new Client(conexao);
    await cliente.connect();
    const res = await cliente.query(sql,values);
    const exercicioDeletado = res.rows[0];
    await cliente.end();
    return exercicioDeletado;
}

module.exports = {
    listar,
    inserir,
    buscarPorId,
    atualizar,
    deletar
}
