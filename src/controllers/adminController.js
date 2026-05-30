const quadraService = require('../services/quadraService');
const path = require('path');

class AdminController {
    // GET /admin/dashboard - Exibe painel de administrador
    dashboard(req, res) {
        res.sendFile(path.join(__dirname, '../public', 'admin-dashboard.html'));
    }

    // POST /admin/courts - Criar nova quadra
    createCourt(req, res) {
        try {
            const { nome, esporte, preco, local } = req.body;

            if (!nome || !esporte || !preco || !local) {
                return res.status(400).send('Preencha todos os campos');
            }

            const novaQuadra = quadraService.criarQuadra({
                nome,
                esporte,
                preco: parseFloat(preco),
                local
            });

            res.status(201).json({ success: true, quadra: novaQuadra });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    // POST /admin/courts/:id/edit - Editar quadra
    editCourt(req, res) {
        try {
            const { id } = req.params;
            const { nome, esporte, preco, local } = req.body;

            if (!nome || !esporte || !preco || !local) {
                return res.status(400).send('Preencha todos os campos');
            }

            const quadraAtualizada = quadraService.atualizarQuadra(id, {
                nome,
                esporte,
                preco: parseFloat(preco),
                local
            });

            if (!quadraAtualizada) {
                return res.status(404).json({ error: 'Quadra não encontrada' });
            }

            res.json({ success: true, quadra: quadraAtualizada });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    // POST /admin/courts/:id/delete - Deletar quadra
    deleteCourt(req, res) {
        try {
            const { id } = req.params;

            const quadraDeletada = quadraService.deletarQuadra(id);

            if (!quadraDeletada) {
                return res.status(404).send(`
                    <html>
                    <head><title>Erro</title></head>
                    <body>
                        <h2>Erro!</h2>
                        <p>Quadra não encontrada</p>
                        <a href="/admin/dashboard">Voltar ao dashboard</a>
                    </body>
                    </html>
                `);
            }

            res.json({ success: true, message: 'Quadra deletada com sucesso' });
        } catch (error) {
            res.status(400).send(`
                <html>
                <head><title>Erro</title></head>
                <body>
                    <h2>Erro!</h2>
                    <p>${error.message}</p>
                    <a href="/admin/dashboard">Voltar ao dashboard</a>
                </body>
                </html>
            `);
        }
    }
}

module.exports = new AdminController();
