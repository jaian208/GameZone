const express=require('express');
const router=express.Router();

const userController= require('../controllers/userController');

router.get('/register', userController.mostrarFormulario);

router.post('/register',userController.crearUsuario);

module.exports = router;