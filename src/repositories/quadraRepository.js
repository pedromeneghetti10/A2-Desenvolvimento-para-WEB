// Banco de dados simulado em memória (Array)
let quadras = [
    { id: 1, nome: "Quadra de Society Premium", esporte: "Futebol", preco: 120, local: "Centro" },
    { id: 2, nome: "Quadra de Tênis Rápida", esporte: "Tênis", preco: 90, local: "Bairro Efapi" },
    { id: 3, nome: "Arena de Beach Tennis", esporte: "Beach Tennis", preco: 80, local: "Bairro Pasqualini" }
];

// Array para guardar os agendamentos realizados
const reservas = [];

class QuadraRepository {
    listarTodas() {
        return quadras;
    }

    buscarPorId(id) {
        return quadras.find(q => q.id === parseInt(id));
    }

    criar(quadraData) {
        const novaQuadra = {
            id: Math.max(...quadras.map(q => q.id), 0) + 1,
            ...quadraData
        };
        quadras.push(novaQuadra);
        return novaQuadra;
    }

    atualizar(id, quadraData) {
        const index = quadras.findIndex(q => q.id === parseInt(id));
        if (index !== -1) {
            quadras[index] = { id: parseInt(id), ...quadraData };
            return quadras[index];
        }
        return null;
    }

    deletar(id) {
        const index = quadras.findIndex(q => q.id === parseInt(id));
        if (index !== -1) {
            return quadras.splice(index, 1)[0];
        }
        return null;
    }

    salvarReserva(reserva) {
        reservas.push(reserva);
        return reserva;
    }

    listarReservas() {
        return reservas;
    }
}

module.exports = new QuadraRepository();