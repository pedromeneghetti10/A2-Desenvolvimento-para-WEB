# Rotas do Sistema - ArenaReserve

Este arquivo lista todos os caminhos (rotas) do nosso sistema de agendamento de quadras.

## 1. Rotas Públicas (Qualquer pessoa acessa)
- **GET /** -> Página inicial que mostra a lista de quadras.
- **GET /login** -> Abre a tela de login.
- **POST /login** -> Recebe os dados e faz o login do usuário.
- **GET /register** -> Abre a tela de cadastro.
- **POST /register** -> Recebe os dados e cria a conta do usuário.
- **GET /forbidden** -> Página de erro caso alguém tente entrar onde não deve.

---

## 2. Rotas do Cliente/Atleta (Precisa estar Logado)
- **GET /logout** -> Desconecta o usuário do sistema e fecha a sessão.
- **GET /courts/:id/book** -> Abre a tela com os horários disponíveis da quadra escolhida.
- **POST /bookings** -> Salva a reserva do horário no sistema.

---

## 3. Rotas do Administrador (Apenas o administrador acessa)
- **GET /admin/dashboard** -> Painel do administrador para gerenciar o sistema.
- **POST /admin/courts** -> Cadastra uma nova quadra.
- **POST /admin/courts/:id/edit** -> Salva as alterações de uma quadra existente.
- **POST /admin/courts/:id/delete** -> Exclui uma quadra do sistema.
