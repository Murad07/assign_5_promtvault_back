import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { UserService } from './user.service';

const getAllUsers = catchAsync(async (req: Request, res: Response) => {
    const result = await UserService.getAllUsers();
    sendResponse(res, { statusCode: 200, success: true, message: 'Users retrieved successfully', data: result });
});

const updateUserRole = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const { role } = req.body;
    const result = await UserService.updateUserRole(id as string, role);
    sendResponse(res, { statusCode: 200, success: true, message: 'User role updated successfully', data: result });
});

const deleteUser = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    await UserService.deleteUser(id as string);
    sendResponse(res, { statusCode: 200, success: true, message: 'User deleted successfully', data: null });
});

const getStatistics = catchAsync(async (req: Request, res: Response) => {
    const user = (req as any).user;
    const result = await UserService.getStatistics(user.id, user.role);
    sendResponse(res, { statusCode: 200, success: true, message: 'Statistics generated successfully', data: result });
});

export const UserController = { getAllUsers, updateUserRole, deleteUser, getStatistics };
