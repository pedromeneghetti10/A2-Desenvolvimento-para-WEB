const authService = require('../services/authService');
const path = require('path');

class AuthController {
    // GET /login - Exibe formulário de login
    loginPage(req, res) {
        res.sendFile(path.join(__dirname, '../public', 'login.html'));
    }

    // POST /login - Processa login
    login(req, res) {
        try {
            const { email, password } = req.body;

            if (!email || !password) {
                return res.status(400).sendFile(path.join(__dirname, '../public', 'error.html'));
            }

            const user = authService.login(email, password);
            req.session.user = user;

            // Redirecionar para dashboard admin ou quadras
            if (user.role === 'admin') {
                res.redirect('/admin/dashboard');
            } else {
                res.redirect('/');
            }
        } catch (error) {
            res.status(400).send(`
                <html>
                <head><title>Erro</title></head>
                <body>
                    <h2>Erro no Login</h2>
                    <p>${error.message}</p>
                    <a href="/login">Voltar ao login</a>
                </body>
                </html>
            `);
        }
    }

    // GET /register - Exibe formulário de cadastro
    registerPage(req, res) {
        res.sendFile(path.join(__dirname, '../public', 'register.html'));
    }

    // POST /register - Processa cadastro
    register(req, res) {
        try {
            const { name, email, phone, password } = req.body;

            if (!name || !email || !phone || !password) {
                return res.status(400).send('Preencha todos os campos');
            }

            const user = authService.register({ name, email, phone, password });
            req.session.user = user;

            res.redirect('/');
        } catch (error) {
            res.status(400).send(`
                <html>
                <head><title>Erro no Cadastro</title></head>
                <body>
                    <h2>Erro no Cadastro</h2>
                    <p>${error.message}</p>
                    <a href="/register">Voltar ao cadastro</a>
                </body>
                </html>
            `);
        }
    }

    // GET /logout - Desconecta usuário
    logout(req, res) {
        req.session.destroy();
        res.redirect('/');
    }

    // GET /forbidden - Página de acesso negado
    forbidden(req, res) {
        res.sendFile(path.join(__dirname, '../public', 'error.html'));
    }
}

module.exports = new AuthController();
