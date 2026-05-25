import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log('🌱 Iniciando o seed do banco de dados...');

    // Exemplo: Criando um usuário Admin padrão para acessar o Dashboard
    const admin = await prisma.user.upsert({
        where: { email: 'admin@skyx.com' },
        update: {}, // Se já existir, não faz nada
        create: {
            email: 'admin@skyx.com',
            name: 'Admin',
            role: 'ADMIN',
            accounts: {
                create: {
                    accountId: 'admin-credential',
                    providerId: 'credential',
                    password: 'senha_criptografada_aqui', // Em produção, lembre-se de usar uma hash real
                }
            }
        },
    });

    console.log('✅ Admin garantido no banco:', admin.email);
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