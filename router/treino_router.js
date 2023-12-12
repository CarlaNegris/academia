const express = require('express')
const router = express.Router()
const treinoController = require('../controller/treino_controller')

//router: /api/exercicios
router.get('/', treinoController.listar);
router.get('/:id', treinoController.buscarPorId);

module.exports = router;
