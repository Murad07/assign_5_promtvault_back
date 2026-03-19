import { Request, Response, NextFunction } from 'express';

const notFound = (req: Request, res: Response, next: NextFunction) => {
    res.status(404).json({
        success: false,
        message: 'API Route Not Found',
        errorMessages: [
            {
                path: req.originalUrl,
                message: 'API Route Not Found',
            },
        ],
    });
};

export default notFound;
