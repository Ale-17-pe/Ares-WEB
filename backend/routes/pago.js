const express = require('express');
const router = express.Router();
const pagoController = require('../controllers/pagoController');
const authMiddleware = require('../middlewares/authMiddleware');

// Ruta protegida
router.post('/', authMiddleware, pagoController.procesarPago);

module.exports = router;
