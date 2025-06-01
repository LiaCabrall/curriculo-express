const express = require('express');
const router = express.Router();
const habilidadeController = require('../controllers/habilidadeController');

router.get('/', habilidadeController.getAllHabilidades);
router.get('/:id', habilidadeController.getHabilidadeById);
router.post('/', habilidadeController.createHabilidade);
router.put('/:id', habilidadeController.updateHabilidade);
router.delete('/:id', habilidadeController.deleteHabilidade);

module.exports = router;
