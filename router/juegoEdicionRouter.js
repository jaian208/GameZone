const express= require('express');
const router = express.Router();

const juegoEdicionController = require('../controllers/juegoEdicionController');

router.get('/edicion/:id',juegoEdicionController.MostrarFormularioEdicion);
router.post('/edicion/:id',juegoEdicionController.EditarJuego);

module.exports = router;