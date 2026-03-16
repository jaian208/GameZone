const express = require('express');


const router = express.Router();

const homeController = require('../controllers/homeController');

router.get('/categoria/:nombreCategoria', homeController.categoria);

router.get('/', homeController.home);

module.exports = router;