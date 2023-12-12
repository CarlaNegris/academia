const express = require('express')
const router = express.Router()
const alunoController = require('../controller/aluno_controller')

//router: /api/alunos
router.get('/', alunoController.listar);
router.post('/', alunoController.inserir);
router.get('/:id', alunoController.buscarPorId);
router.put('/:id', alunoController.atualizar);
router.delete('/:id', alunoController.deletar);

module.exports = router;