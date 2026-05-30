const express = require('express');
const session = require('express-session');
const path = require('path');

// Importando as Rotas do Projeto (Camada de Rotas)
const quadraRoutes = require('./routes/quadraRoutes');
const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/adminRoutes');
const apiRoutes = require('./routes/apiRoutes');

const app = express();
const PORT = 3000;

// Configuração para receber dados de formulários (POST) e JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Configuração da Sessão para controle de login/restrições
app.use(session({
    secret: 'arena-secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 24 * 60 * 60 * 1000 } // 24 horas
}));

// Servir arquivos estáticos (CSS, imagens, Javascript do cliente)
app.use(express.static(path.join(__dirname, 'public')));

// Ativando as rotas da aplicação
app.use(quadraRoutes);
app.use(authRoutes);
app.use(adminRoutes);
app.use('/api', apiRoutes);

// Inicialização do servidor na porta 3000
app.listen(PORT, () => {
    console.log(`🚀 Servidor ArenaReserve rodando em http://localhost:${PORT}`);
    console.log(`📝 Teste com admin@arena.com / admin123`);
});