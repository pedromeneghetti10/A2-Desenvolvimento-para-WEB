// Banco de dados simulado em memória
const users = [
    { id: 1, name: 'Admin Arena', email: 'admin@arena.com', password: 'admin123', phone: '11999999999', role: 'admin' }
];

class UserRepository {
    // Buscar usuário por email
    findByEmail(email) {
        return users.find(u => u.email === email);
    }

    // Buscar todos os usuários
    findAll() {
        return users;
    }

    // Criar novo usuário
    create(userData) {
        const newUser = {
            id: users.length + 1,
            ...userData,
            role: 'atleta' // Usuários novos são atletas por padrão
        };
        users.push(newUser);
        return newUser;
    }

    // Atualizar usuário
    update(id, userData) {
        const user = users.find(u => u.id === id);
        if (user) {
            Object.assign(user, userData);
            return user;
        }
        return null;
    }

    // Deletar usuário
    delete(id) {
        const index = users.findIndex(u => u.id === id);
        if (index !== -1) {
            return users.splice(index, 1)[0];
        }
        return null;
    }
}

module.exports = new UserRepository();
