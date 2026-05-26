# Planejamento Técnico e Arquitetura - ArenaReserve

## Estrutura de Pastas (Padrão MSC)
O projeto adotará a arquitetura em camadas utilizando o padrão Model-Service-Controller (com foco na divisão clara entre Services e Repositories), estruturado conforme o diretório abaixo:

```text
src/
├── config/             # Arquivos de configuração (banco de dados em memória/JSON e sessões)
├── controllers/        # Intercepta as requisições HTTP, extrai dados e define as respostas/views
├── services/           # Concentra as regras de negócio e validações lógicas do sistema
├── repositories/       # Isolamento do acesso aos dados (leitura e escrita direta nos arquivos/memória)
├── middlewares/        # Interceptadores de requisições (controle de autenticação e permissões de acesso)
├── routes/             # Definição e mapeamento de todos os endpoints e rotas da aplicação
├── views/              # Camada de apresentação visual da aplicação (páginas HTML)
└── public/             # Recursos estáticos do frontend (arquivos .css, imagens e scripts .js locais)
```

## Descrição das Responsabilidades

### 1. Controllers
A camada de controle lida diretamente com o ciclo de requisição e resposta HTTP da aplicação Express. Suas principais atribuições são:
- Receber os dados enviados pelos formulários ou parâmetros de URL (`req.body`, `req.params`, `req.query`).
- Repassar os dados tratados para a camada correspondente de *Services*.
- Capturar o retorno da *Service* e encaminhar o usuário para a resposta visual adequada (renderizando uma tela com `res.render()` ou disparando um redirecionamento com `res.redirect()`).

### 2. Services
A camada de serviços contém o "coração" das regras de negócio do sistema. É onde ficam localizadas as validações e lógicas que tornam o software confiável. Suas principais atribuições são:
- Validar se os dados enviados estão corretos.
- **Regra de Negócio Central:** Verificar se uma quadra específica já não possui um agendamento ativo para a mesma data e horário solicitados antes de permitir uma nova reserva.
- Garantir a integridade da lógica de criação de usuários e cancelamentos.

### 3. Repositories
A camada de repositórios isola a manipulação de dados de todo o resto do sistema. Se precisarmos mudar onde guardamos os dados no futuro, apenas esta camada é alterada. Suas principais atribuições são:
- Realizar consultas diretas na fonte de persistência (leitura de arrays na memória ou arquivos JSON de persistência provisória).
- Persistir novos registros no sistema (adicionar novos agendamentos, novos usuários e novas quadras).
- Fornecer métodos auxiliares de busca rápida, como `findByEmail(email)` ou `findBookingsByDate(courtId, date)`.

### 4. Middlewares
Funções que interceptam a requisição HTTP antes que ela chegue ao Controller final. Serão criados dois middlewares principais focados em sessões (`express-session`):
- `authMiddleware`: Verifica se há um usuário ativo logado na sessão atual. Caso não esteja logado, bloqueia a requisição e redireciona para a página de `/login`.
- `adminMiddleware`: Verifica se o usuário presente na sessão possui o nível de acesso (`role`) igual a administrador. Caso seja um usuário comum (Atleta), bloqueia o acesso e o redireciona para uma página de erro de acesso negado (`/forbidden`).
