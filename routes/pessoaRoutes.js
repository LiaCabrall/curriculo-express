const express = require('express');
const router = express.Router();
const pessoaController = require('../controllers/pessoaController');

router.get('/', pessoaController.getAllPessoas);
router.get('/:id', pessoaController.getPessoaById);
router.post('/', pessoaController.createPessoa);
router.put('/:id', pessoaController.updatePessoa);
router.delete('/:id', pessoaController.deletePessoa);

module.exports = router;
