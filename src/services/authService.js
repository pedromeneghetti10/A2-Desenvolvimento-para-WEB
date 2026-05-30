const userRepository = require('../repositories/userRepository');

class AuthService {
    // Fazer login
    login(email, password) {
        const user = userRepository.findByEmail(email);

        if (!user) {
            throw new Error('Email não encontrado');
        }

        if (user.password !== password) {
            throw new Error('Senha incorreta');
        }

        // Retornar usuário sem a senha
        const { password: _, ...userWithoutPassword } = user;
        return userWithoutPassword;
    }

    // Registrar novo usuário
    register(userData) {
        const { name, email, phone, password } = userData;

        // Validações
        if (!name || !email || !phone || !password) {
            throw new Error('Todos os campos são obrigatórios');
        }

        // Verificar se email já existe
        const existingUser = userRepository.findByEmail(email);
        if (existingUser) {
            throw new Error('Email já cadastrado');
        }

        // Criar novo usuário
        const newUser = userRepository.create({
            name,
            email,
            phone,
            password
        });

        // Retornar usuário sem a senha
        const { password: _, ...userWithoutPassword } = newUser;
        return userWithoutPassword;
    }

    // Verificar se usuário existe
    userExists(email) {
        return userRepository.findByEmail(email) !== undefined;
    }
}

module.exports = new AuthService();
