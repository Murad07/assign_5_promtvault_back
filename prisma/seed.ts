import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

// Use a separate fresh PrismaClient for the seed script
const prisma = new PrismaClient();

const seedAdmin = async () => {
    try {
        const adminEmail = 'admin@promptvault.com';
        const existingAdmin = await prisma.user.findUnique({
            where: { email: adminEmail },
        });

        if (!existingAdmin) {
            const hashedPassword = await bcrypt.hash('admin123', 12);
            await prisma.user.create({
                data: {
                    name: 'Super Admin',
                    email: adminEmail,
                    password: hashedPassword,
                    role: 'ADMIN',
                },
            });
            console.log('✅ Super Admin Seeded Successfully!');
        } else {
            console.log('⚠️ Super Admin already exists.');
        }
    } catch (error) {
        console.error('❌ Failed to seed admin', error);
    } finally {
        await prisma.$disconnect();
    }
};

seedAdmin();
