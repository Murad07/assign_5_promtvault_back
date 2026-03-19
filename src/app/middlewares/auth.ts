import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

const auth = (...requiredRoles: string[]) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const token = req.headers.authorization?.split(' ')[1];

            if (!token) {
                throw new Error('You are not authorized! Token missing.');
            }

            const decoded = jwt.verify(
                token,
                process.env.JWT_SECRET || 'fallback-secret'
            ) as JwtPayload;

            if (requiredRoles.length && !requiredRoles.includes(decoded.role)) {
                throw new Error('You are not authorized! Insufficient permissions.');
            }

            // Attach user info to request
            (req as any).user = decoded;
            next();
        } catch (error) {
            next(error);
        }
    };
};

export default auth;
