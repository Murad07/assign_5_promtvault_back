import prisma from '../../../lib/prisma';

const requestWithdrawal = async (sellerId: string, amount: number) => {
    if (amount < 10) throw new Error("Minimum withdrawal constraint is exactly $10 natively.");

    const sellerSales = await prisma.orderItem.findMany({
        where: { prompt: { sellerId } }
    });
    const totalSales = sellerSales.reduce((acc: number, current: any) => acc + current.price, 0);

    const pastWithdrawals = await (prisma as any).withdrawal.findMany({
        where: { sellerId, status: { in: ["APPROVED", "PENDING"] } }
    });
    const totalWithdrawn = pastWithdrawals.reduce((acc: number, current: any) => acc + current.amount + current.fee, 0);

    if (totalSales - totalWithdrawn < amount) {
        throw new Error("Insufficient unwithdrawn balance to request explicit payout natively.");
    }

    const fee = amount * 0.05;

    return await (prisma as any).withdrawal.create({
        data: {
            amount: amount - fee,
            fee: fee,
            sellerId: sellerId
        }
    });
};

const getWithdrawals = async (userId: string, role: string) => {
    if (role === 'SELLER') {
        return await (prisma as any).withdrawal.findMany({
            where: { sellerId: userId },
            orderBy: { createdAt: 'desc' }
        });
    } else {
        return await (prisma as any).withdrawal.findMany({
            include: { seller: { select: { email: true, name: true } } },
            orderBy: { createdAt: 'desc' }
        });
    }
};

const approveWithdrawal = async (id: string, status: any) => {
    return await (prisma as any).withdrawal.update({
        where: { id },
        data: { status }
    });
};

export const WithdrawalService = { requestWithdrawal, getWithdrawals, approveWithdrawal };
