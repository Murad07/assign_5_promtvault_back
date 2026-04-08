import prisma from '../../../lib/prisma';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { OAuth2Client } from 'google-auth-library';

const registerUser = async (payload: any) => {
    const { name, email, password, role } = payload;

    const existingUser = await prisma.user.findUnique({
        where: { email },
    });

    if (existingUser) {
        throw new Error('User already exists with this email');
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = await prisma.user.create({
        data: {
            name,
            email,
            password: hashedPassword,
            role: role || 'BUYER',
        },
    });

    // Strip password from returned payload
    const { password: _, ...userWithoutPassword } = newUser;
    return userWithoutPassword;
};

const loginUser = async (payload: any) => {
    const { email, password } = payload;

    const user = await prisma.user.findUnique({
        where: { email },
    });

    if (!user) {
        throw new Error('Invalid email or password');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        throw new Error('Invalid email or password');
    }

    if (user.isBlocked) {
        throw new Error('This account has been blocked by an administrator');
    }

    // Generate JWT token
    const jwtSecret = process.env.JWT_SECRET || 'fallback-secret';
    const token = jwt.sign(
        { id: user.id, email: user.email, role: user.role },
        jwtSecret,
        { expiresIn: (process.env.JWT_EXPIRES_IN as string) || '7d' } as jwt.SignOptions
    );

    return {
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            createdAt: user.createdAt,
        },
        token,
    };
};

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const googleLogin = async (idToken: string, selectedRole: string = 'BUYER') => {
    const ticket = await client.verifyIdToken({
        idToken,
        audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    if (!payload || !payload.email) {
        throw new Error('Invalid Google Token');
    }

    const { email, name, picture } = payload;

    let user = await prisma.user.findUnique({
        where: { email },
    });

    if (!user) {
        // Create new user if not exists
        user = await prisma.user.create({
            data: {
                name: name || 'Google User',
                email,
                password: await bcrypt.hash(Math.random().toString(36), 12), // Dummy password
                role: selectedRole === 'SELLER' ? 'SELLER' : 'BUYER',
            },
        });
    }

    if (user.isBlocked) {
        throw new Error('This account has been blocked by an administrator');
    }

    // Generate JWT token
    const jwtSecret = process.env.JWT_SECRET || 'fallback-secret';
    const token = jwt.sign(
        { id: user.id, email: user.email, role: user.role },
        jwtSecret,
        { expiresIn: (process.env.JWT_EXPIRES_IN as string) || '7d' } as jwt.SignOptions
    );

    return {
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            createdAt: user.createdAt,
        },
        token,
    };
};

export const AuthService = {
    registerUser,
    loginUser,
    googleLogin,
};
