import prisma from '../../../lib/prisma';

const createReview = async (buyerId: string, payload: any) => {
    const { promptId, rating, comment } = payload;

    // Verify that the user actually purchased this prompt before allowing them to review
    const hasPurchased = await prisma.orderItem.findFirst({
        where: {
            promptId,
            order: {
                buyerId,
                // Typically we would also check status: 'COMPLETED' here, 
                // but since we are mocking payments dynamically pending Stripe integration,
                // we'll just verify the order exists entirely.
            },
        },
    });

    if (!hasPurchased) {
        throw new Error('You cannot review a prompt you have not purchased.');
    }

    // Prevent duplicate reviews from the same buyer on the same prompt
    const existingReview = await prisma.review.findFirst({
        where: {
            buyerId,
            promptId,
        },
    });

    if (existingReview) {
        throw new Error('You have already reviewed this prompt.');
    }

    const result = await prisma.review.create({
        data: {
            buyerId,
            promptId,
            rating,
            comment,
        },
        include: {
            buyer: {
                select: {
                    name: true,
                },
            },
        },
    });

    return result;
};

const getReviewsForPrompt = async (promptId: string) => {
    const result = await prisma.review.findMany({
        where: { promptId },
        include: {
            buyer: {
                select: {
                    name: true,
                },
            },
        },
        orderBy: { createdAt: 'desc' },
    });
    return result;
};

export const ReviewService = {
    createReview,
    getReviewsForPrompt,
};
