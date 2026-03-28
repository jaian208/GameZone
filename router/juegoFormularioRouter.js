const express = require('express');
const router = express.Router();

const juegoFormularioController = require('../controllers/juegoFormularioController');

router.get('/formulario', juegoFormularioController.MostrarFormularioJuegos);
router.post('/formulario', juegoFormularioController.AñadirelJuego);

module.exports = router;
