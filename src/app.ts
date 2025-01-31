/* eslint-disable @typescript-eslint/no-explicit-any */
import express from 'express';
import cors from 'cors';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import notFound from './app/middlewares/notFound';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Application routes

// for Products Routs
// app.use("/api/products", productsRoutes);

// Health Check
app.get('/', (req, res) => {
  res.send('StorySync Server is running');
});

// handling error

app.use(globalErrorHandler as any);
app.use(notFound as any);

export default app;
