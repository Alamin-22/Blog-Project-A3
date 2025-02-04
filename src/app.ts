/* eslint-disable @typescript-eslint/no-explicit-any */
import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import notFound from './app/middlewares/notFound';
import router from './app/routers';
import cookieParser from 'cookie-parser';
const app: Application = express();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: ['http://localhost:3000'] }));

// Application routes
app.use('/api', router); // handling routers from separate func

// Health Check
app.get('/', (req: Request, res: Response) => {
  res.send('StorySync Server is running');
});

// handling error

app.use(globalErrorHandler as any);
app.use(notFound as any);

export default app;
