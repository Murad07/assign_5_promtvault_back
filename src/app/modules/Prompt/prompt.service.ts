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

const getAllPrompts = async (query: Record<string, unknown>) => {
    const { searchTerm, category, sortOrder, page = "1", limit = "100", includeBlocked, minPrice, maxPrice } = query;

    const pageNum = Number(page);
    const limitNum = Number(limit);
    const skip = (pageNum - 1) * limitNum;

    const whereCondition: any = includeBlocked === 'true' ? {} : { isBlocked: false };

    if (category && category !== 'ALL') {
        whereCondition.category = category;
    }

    if (minPrice || maxPrice) {
        whereCondition.price = {};
        if (minPrice) whereCondition.price.gte = Number(minPrice);
        if (maxPrice) whereCondition.price.lte = Number(maxPrice);
    }

    if (searchTerm) {
        whereCondition.OR = [
            { title: { contains: searchTerm as string, mode: 'insensitive' } },
            { description: { contains: searchTerm as string, mode: 'insensitive' } },
        ];
    }

    let orderBy: any = { createdAt: 'desc' };
    if (sortOrder === 'PRICE_ASC') orderBy = { price: 'asc' };
    if (sortOrder === 'PRICE_DESC') orderBy = { price: 'desc' };

    const result = await prisma.prompt.findMany({
        where: whereCondition,
        skip,
        take: limitNum,
        orderBy,
        select: {
            id: true,
            title: true,
            description: true,
            category: true,
            price: true,
            outputPreview: true,
            sellerId: true,
            isBlocked: true,
            seller: {
                select: { name: true },
            },
            reviews: { select: { rating: true } },
            _count: { select: { orderItems: true } },
            createdAt: true,
            updatedAt: true,
        },
    });

    const total = await prisma.prompt.count({ where: whereCondition });

    return {
        data: result,
        meta: {
            page: pageNum,
            limit: limitNum,
            total,
            totalPages: Math.ceil(total / limitNum)
        }
    };
};

const getMyPrompts = async (sellerId: string) => {
    const result = await prisma.prompt.findMany({
        where: { sellerId },
        orderBy: { createdAt: 'desc' },
    });
    return result;
};

const getSinglePrompt = async (id: string) => {
    const result = await prisma.prompt.findUnique({
        where: { id },
        include: {
            seller: {
                select: { name: true, email: true },
            },
            reviews: true,
            _count: {
                select: { orderItems: true }
            }
        }
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
    const prompt = await prisma.prompt.findUnique({ where: { id } });
    if (!prompt) throw new Error("Prompt exclusively not found.");

    const result = await prisma.prompt.update({
        where: { id },
        data: { isBlocked: !prompt.isBlocked },
    });
    return result;
};

export const PromptService = {
    createPrompt,
    getAllPrompts,
    getMyPrompts,
    getSinglePrompt,
    updatePrompt,
    deletePrompt,
};
