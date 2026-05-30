const quadraService = require('../services/quadraService');
const bookingService = require('../services/bookingService');
const path = require('path');

class QuadraController {
    // GET / - Exibe a página inicial com catálogo de quadras
    home(req, res) {
        res.sendFile(path.join(__dirname, '../public', 'index.html'));
    }

    // GET /quadras - Exibe a listagem de quadras (alternativa)
    exibirCatalogo(req, res) {
        const quadras = quadraService.obterCatalogo();
        res.sendFile(path.join(__dirname, '../public', 'quadras.html'));
    }

    // GET /courts/:id/book - Página de reserva de uma quadra (requer login)
    bookingPage(req, res) {
        const { id } = req.params;
        const quadra = quadraService.obterPorId(id);

        if (!quadra) {
            return res.status(404).sendFile(path.join(__dirname, '../public', 'error.html'));
        }

        res.sendFile(path.join(__dirname, '../public', 'booking.html'));
    }

    // POST /bookings - Processa o agendamento da reserva (requer login)
    agendar(req, res) {
        try {
            const { courtId, date, time } = req.body;
            const userId = req.session.user.id;

            if (!courtId || !date || !time) {
                return res.status(400).send('Dados incompletos');
            }

            const reserva = bookingService.realizarReserva(userId, courtId, date, time);

            // Salvar dados da reserva na sessão para exibir na tela de sucesso
            req.session.lastBooking = reserva;

            res.sendFile(path.join(__dirname, '../public', 'success.html'));
        } catch (error) {
            res.status(400).send(`
                <html>
                <head><title>Erro na Reserva</title></head>
                <body>
                    <h2>Erro no Agendamento! ❌</h2>
                    <p>${error.message}</p>
                    <a href="/quadras">Voltar às quadras</a>
                </body>
                </html>
            `);
        }
    }
}

module.exports = new QuadraController();