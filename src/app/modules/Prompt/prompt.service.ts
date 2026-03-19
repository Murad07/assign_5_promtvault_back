import prisma from '../../../lib/prisma';

const createPrompt = async (sellerId: string, payload: any) => {
    const result = await prisma.prompt.create({
        data: {
            ...payload,
            sellerId,
        },
    });
    return result;
};

const getAllPrompts = async () => {
    const result = await prisma.prompt.findMany({
        where: {
            isBlocked: false,
        },
        select: {
            id: true,
            title: true,
            description: true,
            category: true,
            price: true,
            outputPreview: true,
            sellerId: true,
            seller: {
                select: {
                    name: true,
                },
            },
            createdAt: true,
            updatedAt: true,
            // Intentionally omitting 'secretPrompt' and 'isBlocked'
        },
    });
    return result;
};

const getSinglePrompt = async (id: string) => {
    const result = await prisma.prompt.findUnique({
        where: { id },
    });
    return result;
};

const updatePrompt = async (id: string, payload: any) => {
    const result = await prisma.prompt.update({
        where: { id },
        data: payload,
    });
    return result;
};

const deletePrompt = async (id: string) => {
    const result = await prisma.prompt.delete({
        where: { id },
    });
    return result;
};

export const PromptService = {
    createPrompt,
    getAllPrompts,
    getSinglePrompt,
    updatePrompt,
    deletePrompt,
};
