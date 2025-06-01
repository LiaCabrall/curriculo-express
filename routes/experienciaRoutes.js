const express = require('express');
const router = express.Router();
const experienciaController = require('../controllers/experienciaController');

router.get('/', experienciaController.getAllExperiencias);
router.get('/:id', experienciaController.getExperienciaById);
router.post('/', experienciaController.createExperiencia);
router.put('/:id', experienciaController.updateExperiencia);
router.delete('/:id', experienciaController.deleteExperiencia);

module.exports = router;
