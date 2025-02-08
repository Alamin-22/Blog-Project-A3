import express from 'express';
import { AdminController } from './admin.controller';
import { USER_ROLE } from '../Auth/auth.constant';
import AuthValidationMiddleware from '../../middlewares/authRequest';

const router = express.Router();

// Block user route (Only accessible by admin)
router.patch(
  '/users/:userId/block',
  AuthValidationMiddleware(USER_ROLE.admin),
  AdminController.blockUser,
);

export default router;
