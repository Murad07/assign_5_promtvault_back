import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { WithdrawalService } from './withdrawal.service';

const requestWithdrawal = catchAsync(async (req: Request, res: Response) => {
    const user = (req as any).user;
    const { amount, payoutAddress } = req.body;
    const result = await WithdrawalService.requestWithdrawal(user.id, Number(amount), payoutAddress);
    sendResponse(res, { statusCode: 201, success: true, message: 'Withdrawal safely requested natively', data: result });
});

const getWithdrawals = catchAsync(async (req: Request, res: Response) => {
    const user = (req as any).user;
    const result = await WithdrawalService.getWithdrawals(user.id, user.role);
    sendResponse(res, { statusCode: 200, success: true, message: 'Withdrawal history mapped successfully', data: result });
});

const approveWithdrawal = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const { status } = req.body;
    const result = await WithdrawalService.approveWithdrawal(id as string, status);
    sendResponse(res, { statusCode: 200, success: true, message: `Withdrawal implicitly marked ${status} globally`, data: result });
});

export const WithdrawalController = { requestWithdrawal, getWithdrawals, approveWithdrawal };
