const bookingRepository = require('../repositories/bookingRepository');
const quadraRepository = require('../repositories/quadraRepository');

class BookingService {
    // Realizar reserva
    realizarReserva(userId, courtId, date, time) {
        // Validar se quadra existe
        const court = quadraRepository.buscarPorId(courtId);
        if (!court) {
            throw new Error('Quadra não encontrada');
        }

        // Validar se horário está disponível
        if (!bookingRepository.isTimeAvailable(courtId, date, time)) {
            throw new Error('Este horário já está reservado!');
        }

        // Validar data (não pode ser no passado)
        const bookingDate = new Date(date);
        if (bookingDate < new Date()) {
            throw new Error('Não é possível reservar para datas passadas');
        }

        // Criar reserva
        const newBooking = bookingRepository.create({
            userId,
            courtId: parseInt(courtId),
            date,
            time,
            status: 'confirmada',
            paid: false
        });

        return newBooking;
    }

    // Obter reservas do usuário
    obterMinhasReservas(userId) {
        return bookingRepository.findByUser(userId);
    }

    // Cancelar reserva
    cancelarReserva(bookingId, userId) {
        const booking = bookingRepository.findAll().find(b => b.id === bookingId);

        if (!booking) {
            throw new Error('Reserva não encontrada');
        }

        if (booking.userId !== userId) {
            throw new Error('Você não pode cancelar uma reserva que não é sua');
        }

        return bookingRepository.cancel(bookingId);
    }

    // Obter horários disponíveis para uma quadra em uma data
    obterHorariosDisponiveis(courtId, date) {
        const horariosDisponiveis = [
            '08:00', '09:00', '10:00', '11:00', '12:00',
            '13:00', '14:00', '15:00', '16:00', '17:00',
            '18:00', '19:00', '20:00', '21:00', '22:00'
        ];

        const reservasNaData = bookingRepository.findByCourtAndDate(courtId, date);
        const horariosOcupados = reservasNaData.map(r => r.time);

        return horariosDisponiveis.filter(h => !horariosOcupados.includes(h));
    }
}

module.exports = new BookingService();
