import express from 'express';
import { BlogControllers } from './blog.controller';
import ValidateRequestMiddleWare from '../../middlewares/validateRequest';
import { BlogValidations } from './blog.validation';
import AuthValidationMiddleware from '../../middlewares/authRequest';

const router = express.Router();

router.post(
  '/',
  AuthValidationMiddleware(),
  ValidateRequestMiddleWare(BlogValidations.createBlogValidationSchema),
  BlogControllers.createBlog,
);

router.patch(
  '/:id',
  AuthValidationMiddleware(),
  ValidateRequestMiddleWare(BlogValidations.updateBlogValidationSchema),
  BlogControllers.updateBlog,
);

// router.get('/:id', userControllers.getSingleUser);

export const BlogRoutes = router;
