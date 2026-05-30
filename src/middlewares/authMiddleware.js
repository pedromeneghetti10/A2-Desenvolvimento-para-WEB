// Middleware de Autenticação
// Verifica se há um usuário ativo logado na sessão atual
function authMiddleware(req, res, next) {
    if (req.session && req.session.user) {
        next();
    } else {
        res.redirect('/login');
    }
}

// Middleware de Autorização Admin
// Verifica se o usuário é administrador
function adminMiddleware(req, res, next) {
    if (req.session && req.session.user && req.session.user.role === 'admin') {
        next();
    } else {
        res.redirect('/forbidden');
    }
}

module.exports = {
    authMiddleware,
    adminMiddleware
};
