const express = require('express')
const router = express.Router()
const exercicioController = require('../controller/exercicio_controller')

//router: /api/exercicios
router.get('/', exercicioController.listar);
router.post('/', exercicioController.inserir);
router.get('/:id', exercicioController.buscarPorId);
router.put('/:id', exercicioController.atualizar);
router.delete('/:id', exercicioController.deletar);

module.exports = router;