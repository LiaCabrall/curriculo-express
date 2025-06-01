const express = require('express');
const router = express.Router();
const formacaoController = require('../controllers/formacaoController');

router.get('/', formacaoController.getAllFormacoes);
router.get('/:id', formacaoController.getFormacaoById);
router.post('/', formacaoController.createFormacao);
router.put('/:id', formacaoController.updateFormacao);
router.delete('/:id', formacaoController.deleteFormacao);

module.exports = router;
