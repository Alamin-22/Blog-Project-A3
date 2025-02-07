import express from 'express';
import { BlogControllers } from './blog.controller';

const router = express.Router();

router.post('/', BlogControllers.createBlog);

// router.get('/:id', userControllers.getSingleUser);

export const BlogRoutes = router;
