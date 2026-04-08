import prisma from '../../../lib/prisma';

const sendContactMessage = async (payload: any) => {
    const result = await prisma.contactMessage.create({
        data: payload,
    });
    return result;
};

const getAllMessages = async () => {
    const result = await prisma.contactMessage.findMany({
        orderBy: {
            createdAt: 'desc',
        },
    });
    return result;
};

const markAsRead = async (id: string) => {
    const result = await prisma.contactMessage.update({
        where: { id },
        data: { isRead: true },
    });
    return result;
};

export const ContactService = {
    sendContactMessage,
    getAllMessages,
    markAsRead,
};
