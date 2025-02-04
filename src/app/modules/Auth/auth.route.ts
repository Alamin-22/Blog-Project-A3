import express from 'express';
import ValidateRequestMiddleWare from '../../middlewares/validateRequest';
import { AuthValidations } from './auth.validation';
import { AuthControllers } from './auth.controller';
import AuthValidationMiddleWare from '../../middlewares/authRequest';
import { USER_ROLE } from './auth.constant';

const router = express.Router();

router.post(
  '/register',
  // ValidateRequestMiddleWare(AuthValidations.createUserValidationSchema),
  AuthControllers.createUser,
);

router.post(
  '/login',
  ValidateRequestMiddleWare(AuthValidations.loginValidationSchema),
  AuthControllers.loginUser,
);

router.post(
  '/change_password',
  AuthValidationMiddleWare(USER_ROLE.admin, USER_ROLE.user),
  ValidateRequestMiddleWare(AuthValidations.changePasswordValidationSchema),
  AuthControllers.changePassword,
);

router.post(
  '/refresh_token',
  ValidateRequestMiddleWare(AuthValidations.refreshTokenValidationSchema),
  AuthControllers.refreshToken,
);

export const AuthRoutes = router;
