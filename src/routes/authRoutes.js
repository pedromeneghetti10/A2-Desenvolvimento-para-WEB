const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Rotas públicas de autenticação
router.get('/login', authController.loginPage);
router.post('/login', authController.login);

router.get('/register', authController.registerPage);
router.post('/register', authController.register);

router.get('/logout', authController.logout);

router.get('/forbidden', authController.forbidden);

module.exports = router;
