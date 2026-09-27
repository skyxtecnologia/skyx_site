import '../src/config.js'; // Garante o carregamento das variáveis de ambiente
import { PrismaClient } from '@prisma/client';
import { auth } from '../src/lib/auth.js';

const prisma = new PrismaClient();

async function main() {
    console.log('🌱 Iniciando o seed do banco de dados...');

    // Limpa o usuário antigo caso tenha sido criado com senha em texto puro
    await prisma.user.deleteMany({
        where: { email: 'admin@skyx.com' },
    });

    console.log('Criando usuário administrador via Better Auth (com hash de senha)...');

    // Usamos a API do Better Auth para criar o usuário corretamente com senha criptografada
    await auth.api.signUpEmail({
        body: {
            email: 'admin@skyx.com',
            password: 'lucas1234',
            name: 'Admin',
        },
        // Necessário passar um header vazio para simular a requisição no ambiente CLI
        headers: new Headers(),
    });

    // Atualiza o usuário recém criado para ter a role de ADMIN
    await prisma.user.update({
        where: { email: 'admin@skyx.com' },
        data: { role: 'ADMIN' },
    });

    console.log('✅ Admin garantido no banco: admin@skyx.com');
    console.log('🏁 Seed finalizado com sucesso!');
}

main()
    .catch((e) => {
        console.error('❌ Erro no seed:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
