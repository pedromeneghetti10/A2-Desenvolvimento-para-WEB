const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { authMiddleware, adminMiddleware } = require('../middlewares/authMiddleware');

// Todas as rotas de admin exigem autenticação e role de administrador
router.get('/admin/dashboard', authMiddleware, adminMiddleware, adminController.dashboard);
router.post('/admin/courts', authMiddleware, adminMiddleware, adminController.createCourt);
router.post('/admin/courts/:id/edit', authMiddleware, adminMiddleware, adminController.editCourt);
router.post('/admin/courts/:id/delete', authMiddleware, adminMiddleware, adminController.deleteCourt);

module.exports = router;
