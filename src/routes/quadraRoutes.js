const express = require('express');
const router = express.Router();
const quadraController = require('../controllers/quadraControllers');
const { authMiddleware } = require('../middlewares/authMiddleware');

// Rota pública para página inicial
router.get('/', quadraController.home);

// Rota pública para listar as quadras
router.get('/quadras', quadraController.exibirCatalogo);

// Rota privada (requer autenticação) para página de reserva
router.get('/courts/:id/book', authMiddleware, quadraController.bookingPage);

// Rota privada (requer autenticação) para processar a reserva
router.post('/bookings', authMiddleware, quadraController.agendar);

module.exports = router;