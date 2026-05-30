const express = require('express');
const router = express.Router();
const quadraRepository = require('../repositories/quadraRepository');
const bookingRepository = require('../repositories/bookingRepository');
const { authMiddleware } = require('../middlewares/authMiddleware');

// API para obter todas as quadras em JSON (públicos - não requer autenticação)
router.get('/courts', (req, res) => {
    const quadras = quadraRepository.listarTodas();
    res.json(quadras);
});

// API para obter uma quadra específica (públicos - não requer autenticação)
router.get('/courts/:id', (req, res) => {
    const quadra = quadraRepository.buscarPorId(req.params.id);
    if (!quadra) {
        return res.status(404).json({ error: 'Quadra não encontrada' });
    }
    res.json(quadra);
});

// API para obter horários disponíveis (REQUER AUTENTICAÇÃO)
router.get('/courts/:id/available-times', authMiddleware, (req, res) => {
    const { id } = req.params;
    const { date } = req.query;

    if (!date) {
        return res.status(400).json({ error: 'Data não fornecida' });
    }

    // Horários disponíveis (8h até 22h)
    const todasOsHorarios = [
        '08:00', '09:00', '10:00', '11:00', '12:00',
        '13:00', '14:00', '15:00', '16:00', '17:00',
        '18:00', '19:00', '20:00', '21:00', '22:00'
    ];

    // Buscar reservas para essa quadra nessa data
    const reservasNaData = bookingRepository.findByCourtAndDate(id, date);
    const horariosOcupados = reservasNaData.map(r => r.time);

    // Horários disponíveis = todos - ocupados
    const horariosDisponiveis = todasOsHorarios.filter(h => !horariosOcupados.includes(h));

    res.json({
        courtId: id,
        date,
        allTimes: todasOsHorarios,
        availableTimes: horariosDisponiveis,
        bookedTimes: horariosOcupados
    });
});

// API para obter informações do usuário logado (REQUER AUTENTICAÇÃO)
router.get('/user', authMiddleware, (req, res) => {
    if (req.session && req.session.user) {
        res.json({
            id: req.session.user.id,
            name: req.session.user.name,
            email: req.session.user.email,
            phone: req.session.user.phone,
            role: req.session.user.role
        });
    } else {
        res.status(401).json({ error: 'Não autenticado' });
    }
});

// API para obter dados da última reserva (REQUER AUTENTICAÇÃO)
router.get('/last-booking', authMiddleware, (req, res) => {
    if (req.session && req.session.lastBooking) {
        const booking = req.session.lastBooking;
        const court = quadraRepository.buscarPorId(booking.courtId);

        res.json({
            courtId: booking.courtId,
            courtName: court ? court.nome : 'Quadra',
            courtAddress: court ? court.local : '',
            courtPrice: court ? court.preco : 0,
            date: booking.date,
            time: booking.time,
            userId: booking.userId
        });
    } else {
        res.status(404).json({ error: 'Nenhuma reserva encontrada' });
    }
});

module.exports = router;
