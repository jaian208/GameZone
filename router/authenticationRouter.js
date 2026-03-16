const express = require('express');
const router = express.Router();

const authenticationRouter = require('../controllers/authenticationController');

router.get('/login', authenticationRouter.mostrarLogin);

router.post('/login', authenticationRouter.AutenticarLogin);

module.exports = router;