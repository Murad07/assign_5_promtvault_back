import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { ContactService } from './contact.service';

const sendContactMessage = catchAsync(async (req: Request, res: Response) => {
    const result = await ContactService.sendContactMessage(req.body);
    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: 'Message sent successfully',
        data: result,
    });
});

const getAllMessages = catchAsync(async (req: Request, res: Response) => {
    const result = await ContactService.getAllMessages();
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Messages retrieved successfully',
        data: result,
    });
});

const markAsRead = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await ContactService.markAsRead(id as string);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Message marked as read',
        data: result,
    });
});

export const ContactController = {
    sendContactMessage,
    getAllMessages,
    markAsRead,
};
