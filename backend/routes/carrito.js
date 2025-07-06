const express = require('express');
const router = express.Router();
const carritoController = require('../controllers/carritoController');
const authMiddleware = require('../middlewares/authMiddleware');

// Ruta protegida
router.get('/', authMiddleware, carritoController.obtenerCarrito);

module.exports = router;
