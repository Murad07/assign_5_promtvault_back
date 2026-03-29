import { Response } from 'express';

type IApiResponse<T> = {
    statusCode: number;
    success: boolean;
    message?: string;
    data?: T;
    meta?: any;
};

const sendResponse = <T>(res: Response, data: IApiResponse<T>) => {
    res.status(data.statusCode).json({
        success: data.success,
        message: data.message,
        data: data.data,
        meta: data.meta,
    });
};

export default sendResponse;
