# Descrição do Projeto - ArenaReserve
## Nome do Sistema
ArenaReserve
## Tema
Sistema Web para Gestão e Agendamento de Quadras Esportivas.
## Objetivo do Sistema
O objetivo do ArenaReserve é automatizar e centralizar o processo de aluguel de quadras esportivas. O sistema visa facilitar a vida do atleta, que consegue visualizar e reservar horários em tempo real, e do gestor da arena, que automatiza o controle de sua agenda e reduz o tempo gasto com atendimento manual.
## Descrição Geral do Funcionamento
O sistema funcionará através de uma interface web onde qualquer visitante pode visualizar as quadras disponíveis na página inicial. 
Para realizar um agendamento, o usuário deve se autenticar no sistema. O ArenaReserve utiliza o conceito de sessões para separar dois tipos de perfis:
1. **Atleta:** Acessa uma área privada onde pode escolher uma data, visualizar os horários disponíveis em uma grade interativa, confirmar a reserva e acompanhar seu histórico.
2. **Administrador/Gestor:** Acessa um painel exclusivo para cadastrar novas quadras, definir preços, bloquear horários para manutenção e gerenciar o fluxo de reservas da arena.
## Público-Alvo
- Atletas amadores e grupos de amigos que buscam praticar esportes (futebol, tênis, vôlei, beach tennis, etc.) e precisam reservar espaços de forma rápida.
- Proprietários, gerentes e administradores de complexos esportivos, clubes e arenas.
## Funcionalidades Principais
- **Autenticação Segura:** Cadastro e login de usuários diferenciando clientes (Atletas) de administradores (Gestores).
- **Catálogo de Quadras:** Listagem pública na página inicial, descrição e modalidades de cada quadra.
- **Grade de Horários Interativa:** Exibição visual dos horários disponíveis e ocupados para uma determinada data.
- **Mecanismo de Reserva (Privado - Atleta):** Clique e agende um horário vago com cálculo automático do preço.
- **Cancelamento de Reservas (Privado - Atleta/Admin):** Opção de desistência do horário dentro das regras do sistema.
- **Gerenciamento de Espaços (Privado - Admin):** Painel administrativo com o CRUD completo (Criar, Ler, Atualizar e Deletar) de quadras.
- **Controle de Ocupação (Privado - Admin):** Visualização consolidada de todos os agendamentos do dia para controle interno da arena.
- **Forma de Pagamento (Apenas Presencial):** O sistema web é focado estritamente no agendamento e reserva do horário. **Não há cobrança online**. Todo o pagamento do valor do aluguel deve ser realizado presencialmente no local no dia do uso da quadra.
