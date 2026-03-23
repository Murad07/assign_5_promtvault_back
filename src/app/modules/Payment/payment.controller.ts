import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { PaymentService } from './payment.service';

const createIntent = catchAsync(async (req: Request, res: Response) => {
    const { amount } = req.body;
    const result = await PaymentService.createPaymentIntent(amount);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Payment intent created successfully',
        data: result,
    });
});

export const PaymentController = {
    createIntent,
};
