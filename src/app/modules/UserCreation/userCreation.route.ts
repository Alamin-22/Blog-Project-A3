import express from 'express';
import { userCreationControllers } from './userCreation.controller';

const router = express.Router();

// creating Middleware to connect all routes to the main route

router.post('/create_user', userCreationControllers.createUser);

export const userCreationRoutes = router;
