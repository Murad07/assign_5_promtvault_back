import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { ReviewService } from './review.service';

const createReview = catchAsync(async (req: Request, res: Response) => {
    const buyerId = (req as any).user.id;
    const result = await ReviewService.createReview(buyerId, req.body);

    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: 'Review submitted successfully',
        data: result,
    });
});

const getReviewsForPrompt = catchAsync(async (req: Request, res: Response) => {
    const promptId = req.params.promptId as string;
    const result = await ReviewService.getReviewsForPrompt(promptId);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Reviews retrieved successfully',
        data: result,
    });
});

export const ReviewController = {
    createReview,
    getReviewsForPrompt,
};
