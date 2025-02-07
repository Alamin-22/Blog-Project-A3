import express from 'express';
import { BlogControllers } from './blog.controller';
import ValidateRequestMiddleWare from '../../middlewares/validateRequest';
import { BlogValidations } from './blog.validation';

const router = express.Router();

router.post(
  '/',
  ValidateRequestMiddleWare(BlogValidations.createBlogValidationSchema),
  BlogControllers.createBlog,
);

// router.get('/:id', userControllers.getSingleUser);

export const BlogRoutes = router;
