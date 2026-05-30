const quadraRepository = require('../repositories/quadraRepository');

class QuadraService {
    obterCatalogo() {
        return quadraRepository.listarTodas();
    }

    obterPorId(id) {
        return quadraRepository.buscarPorId(id);
    }

    criarQuadra(dadosQuadra) {
        // Validações
        if (!dadosQuadra.nome || !dadosQuadra.esporte || !dadosQuadra.preco || !dadosQuadra.local) {
            throw new Error('Todos os campos são obrigatórios');
        }

        if (dadosQuadra.preco <= 0) {
            throw new Error('O preço deve ser maior que zero');
        }

        return quadraRepository.criar(dadosQuadra);
    }

    atualizarQuadra(id, dadosQuadra) {
        // Validações
        if (!dadosQuadra.nome || !dadosQuadra.esporte || !dadosQuadra.preco || !dadosQuadra.local) {
            throw new Error('Todos os campos são obrigatórios');
        }

        if (dadosQuadra.preco <= 0) {
            throw new Error('O preço deve ser maior que zero');
        }

        return quadraRepository.atualizar(id, dadosQuadra);
    }

    deletarQuadra(id) {
        return quadraRepository.deletar(id);
    }

    realizarReserva(quadraId, data, horario, usuarioNome) {
        const reservasAtuais = quadraRepository.listarReservas();

        // Regra de Negócio: Evitar Conflito de Horário Duplicado
        const horarioOcupado = reservasAtuais.some(r =>
            r.quadraId === parseInt(quadraId) && r.data === data && r.horario === horario
        );

        if (horarioOcupado) {
            throw new Error("Este horário já está reservado por outro atleta!");
        }

        const novaReserva = {
            id: reservasAtuais.length + 1,
            quadraId: parseInt(quadraId),
            data,
            horario,
            usuarioNome,
            pago: false // Regra: Pagamento apenas presencial no dia
        };

        return quadraRepository.salvarReserva(novaReserva);
    }
}

module.exports = new QuadraService();