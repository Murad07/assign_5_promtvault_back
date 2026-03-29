import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { PromptService } from './prompt.service';

const createPrompt = catchAsync(async (req: Request, res: Response) => {
    const sellerId = (req as any).user.id;
    const result = await PromptService.createPrompt(sellerId, req.body);

    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: 'Prompt created successfully',
        data: result,
    });
});

const getAllPrompts = catchAsync(async (req: Request, res: Response) => {
    const result = await PromptService.getAllPrompts(req.query);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Prompts retrieved successfully',
        data: result.data,
        meta: result.meta
    });
});

const getMyPrompts = catchAsync(async (req: Request, res: Response) => {
    const sellerId = (req as any).user.id;
    const result = await PromptService.getMyPrompts(sellerId);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Your prompts retrieved successfully',
        data: result,
    });
});

const getSinglePrompt = catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id as string;
    const result = await PromptService.getSinglePrompt(id);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Prompt retrieved successfully',
        data: result,
    });
});

const updatePrompt = catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id as string;
    const result = await PromptService.updatePrompt(id, req.body);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Prompt updated successfully',
        data: result,
    });
});

const deletePrompt = catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id as string;
    const result = await PromptService.deletePrompt(id);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Prompt deleted successfully',
        data: result,
    });
});

export const PromptController = {
    createPrompt,
    getAllPrompts,
    getMyPrompts,
    getSinglePrompt,
    updatePrompt,
    deletePrompt,
};
