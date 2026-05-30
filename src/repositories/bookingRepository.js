// Banco de dados simulado em memória para reservas
const bookings = [];

class BookingRepository {
    // Listar todas as reservas
    findAll() {
        return bookings;
    }

    // Buscar reservas por data e quadra
    findByCourtAndDate(courtId, date) {
        return bookings.filter(b => b.courtId === parseInt(courtId) && b.date === date);
    }

    // Buscar reservas por usuário
    findByUser(userId) {
        return bookings.filter(b => b.userId === userId);
    }

    // Criar nova reserva
    create(bookingData) {
        const newBooking = {
            id: bookings.length + 1,
            ...bookingData,
            createdAt: new Date()
        };
        bookings.push(newBooking);
        return newBooking;
    }

    // Verificar se horário está disponível
    isTimeAvailable(courtId, date, time) {
        return !bookings.some(b =>
            b.courtId === parseInt(courtId) &&
            b.date === date &&
            b.time === time
        );
    }

    // Cancelar reserva
    cancel(id) {
        const index = bookings.findIndex(b => b.id === id);
        if (index !== -1) {
            return bookings.splice(index, 1)[0];
        }
        return null;
    }
}

module.exports = new BookingRepository();
