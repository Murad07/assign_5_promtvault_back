import { Server } from 'http';
import app from './app';

const PORT = process.env.PORT || 5000;

let server: Server;

async function bootstrap() {
    try {
        server = app.listen(PORT, () => {
            console.log(`🚀 PromptVault Server is running on http://localhost:${PORT}`);
        });
    } catch (err) {
        console.error('Failed to start server', err);
    }
}

bootstrap();

// Handle unexpected errors preventing crashing without logging
process.on('unhandledRejection', (err) => {
    console.log(`😈 unhandledRejection is detected, shutting down...`, err);
    if (server) {
        server.close(() => {
            process.exit(1);
        });
    } else {
        process.exit(1);
    }
});

process.on('uncaughtException', (err) => {
    console.log(`😈 uncaughtException is detected, shutting down...`, err);
    process.exit(1);
});
