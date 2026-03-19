import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import router from './app/routes';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import notFound from './app/middlewares/notFound';

const app: Application = express();

// Parsers & Middlewares
app.use(express.json());
app.use(cors());

// Application Main Routes Route
app.use('/api', router);

// Root Health Check Route
app.get('/', (req: Request, res: Response) => {
    res.send('Welcome to the PromptVault API!');
});

// Global Error Handler
app.use(globalErrorHandler);

// Not Found Route Handler
app.use(notFound);

export default app;
