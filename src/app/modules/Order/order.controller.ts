import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { OrderService } from './order.service';

const createOrder = catchAsync(async (req: Request, res: Response) => {
    const buyerId = (req as any).user.id;
    const { promptIds } = req.body; // Expecting an array of prompt IDs from the Cart

    const result = await OrderService.createOrder(buyerId, promptIds);

    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: 'Order initiated successfully',
        data: result,
    });
});

const getAllOrders = catchAsync(async (req: Request, res: Response) => {
    const result = await OrderService.getAllOrders();

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'All platform orders retrieved successfully',
        data: result,
    });
});

const getMyOrders = catchAsync(async (req: Request, res: Response) => {
    const buyerId = (req as any).user.id;
    const result = await OrderService.getMyOrders(buyerId);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Your purchased orders retrieved successfully',
        data: result,
    });
});

export const OrderController = {
    createOrder,
    getAllOrders,
    getMyOrders,
};
