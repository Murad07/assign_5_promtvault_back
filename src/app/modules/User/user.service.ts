import prisma from '../../../lib/prisma';

const getAllUsers = async () => {
    return await prisma.user.findMany({
        select: {
            id: true,
            name: true,
            email: true,
            role: true,
            createdAt: true,
        },
        orderBy: { createdAt: 'desc' },
    });
};

const updateUserRole = async (id: string, role: any) => {
    return await prisma.user.update({
        where: { id },
        data: { role },
        select: { id: true, name: true, role: true },
    });
};

const deleteUser = async (id: string) => {
    return await prisma.user.delete({
        where: { id },
    });
};

const getStatistics = async (userId: string, role: string) => {
    if (role === 'ADMIN') {
        const usersByRoleRaw = await prisma.user.groupBy({
            by: ['role'],
            _count: { id: true },
        });

        const usersByRole = usersByRoleRaw.map(u => ({
            name: u.role,
            value: u._count.id
        }));

        const salesByCategoryRaw = await prisma.orderItem.findMany({
            include: { prompt: { select: { category: true } } },
        });

        const catMap: Record<string, number> = {};
        salesByCategoryRaw.forEach(item => {
            const cat = item.prompt.category;
            catMap[cat] = (catMap[cat] || 0) + item.price;
        });

        const salesByCategory = Object.entries(catMap).map(([name, val]) => ({
            name,
            value: val
        }));

        return {
            totalUsers: await prisma.user.count(),
            totalRevenue: salesByCategoryRaw.reduce((sum, item) => sum + item.price, 0),
            totalPrompts: await prisma.prompt.count(),
            totalOrders: await prisma.order.count(),
            usersByRole,
            salesByCategory,
        };
    } else if (role === 'SELLER') {
        const totalListed = await prisma.prompt.count({ where: { sellerId: userId } });

        const salesItems = await prisma.orderItem.findMany({
            where: { prompt: { sellerId: userId } }
        });

        const totalSales = salesItems.length;
        const totalRevenue = salesItems.reduce((sum, item) => sum + item.price, 0);

        return {
            totalListed,
            totalSales,
            totalRevenue
        };
    } else {
        const totalPurchases = await prisma.order.count({ where: { buyerId: userId } });
        const totalReviews = await prisma.review.count({ where: { buyerId: userId } });

        return {
            totalPurchases,
            totalReviews
        };
    }
};

export const UserService = { getAllUsers, updateUserRole, deleteUser, getStatistics };
