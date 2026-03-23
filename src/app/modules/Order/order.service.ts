import prisma from '../../../lib/prisma';

const createOrder = async (buyerId: string, promptIds: string[]) => {
    // Fetch the current price of each prompt
    const prompts = await prisma.prompt.findMany({
        where: { id: { in: promptIds } },
    });

    if (prompts.length !== promptIds.length) {
        throw new Error('One or more prompt IDs are invalid');
    }

    // Calculate the total cart amount based on live database prices
    const totalAmount = prompts.reduce((sum, prompt) => sum + prompt.price, 0);

    // Run as a transaction to perfectly guarantee Order + Items integrity
    const result = await prisma.$transaction(async (tx) => {
        const order = await tx.order.create({
            data: {
                buyerId,
                totalAmount,
                status: 'COMPLETED', // Directly mapping success since the client strictly verified Stripe payloads first
                items: {
                    create: prompts.map((p) => ({
                        promptId: p.id,
                        price: p.price,
                    })),
                },
            },
            include: {
                items: true,
            },
        });
        return order;
    });

    return result;
};

const getAllOrders = async () => {
    const result = await prisma.order.findMany({
        include: {
            buyer: {
                select: {
                    name: true,
                    email: true,
                },
            },
            items: {
                include: {
                    prompt: {
                        select: {
                            title: true,
                            price: true,
                            sellerId: true,
                        },
                    },
                },
            },
        },
        orderBy: { createdAt: 'desc' },
    });
    return result;
};

const getMyOrders = async (buyerId: string) => {
    const result = await prisma.order.findMany({
        where: { buyerId },
        include: {
            items: {
                include: {
                    prompt: {
                        select: {
                            id: true,
                            title: true,
                            description: true,
                            price: true,
                            outputPreview: true,
                            sellerId: true,
                            // We intentionally securely reveal the secretPrompt only inside purchased order histories!
                            secretPrompt: true,
                        },
                    },
                },
            },
        },
        orderBy: { createdAt: 'desc' },
    });
    return result;
};

export const OrderService = {
    createOrder,
    getAllOrders,
    getMyOrders,
};
