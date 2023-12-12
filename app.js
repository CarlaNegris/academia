const express = require('express')
const alunoRouter = require('./router/aluno_router');
const exercicioRouter = require('./router/exercicio_router');
const treinoRouter = require('./router/treino_router');

const app = express()
const port = 3000

app.use(express.json());

app.get('/', (req, res) => {
  res.send('ACADEMIA FINAL')
})

app.use('/api/alunos', alunoRouter);
app.use('/api/exercicios', exercicioRouter);
app.use('/api/treinos', treinoRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})