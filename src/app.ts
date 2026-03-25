import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import router from './app/routes';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import notFound from './app/middlewares/notFound';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import path from 'path';

const app: Application = express();

// Parsers & Middlewares
app.use(express.json());
app.use(cors());

// Application Main Routes Route
app.use('/api', router);

// Swagger Documentation Setup
const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'PromptVault API',
            version: '1.0.0',
            description: 'API documentation for the PromptVault backend',
        },
        servers: [
            { url: 'http://localhost:5000' }
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
        },
    },
    // Vercel Serverless deployments require strictly bound absolute CWD paths to parse Globs natively
    apis: [
        path.join(process.cwd(), 'src/app/modules/**/*.route.ts'),
        path.join(process.cwd(), 'dist/app/modules/**/*.route.js') // Fallback for compiled executions
    ],
};
const swaggerSpecs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs, {
    customCssUrl: "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.min.css",
    customJs: [
        "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-bundle.js",
        "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-standalone-preset.js",
    ],
}));

// Root Health Check Route
app.get('/', (req: Request, res: Response) => {
    res.send('Welcome to the PromptVault API!');
});

// Global Error Handler
app.use(globalErrorHandler);

// Not Found Route Handler
app.use(notFound);

export default app;
