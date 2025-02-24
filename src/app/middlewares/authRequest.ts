import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import AppError from '../errors/AppError';
import catchAsync from '../utils/catchAsync';
import { TUserRole } from '../modules/Auth/auth.interface';
import { UserModel } from '../modules/User/user.model';

const AuthValidationMiddleware = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    // Extract token from Authorization header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized!');
    }

    const token = authHeader.split(' ')[1]; // Extract token after "Bearer"

    // Verify and decode the token
    const decoded = jwt.verify(
      token,
      config.access_secret as string,
    ) as JwtPayload;

    console.log('Decoded JWT:', decoded);

    // Extract user ID from the decoded token
    const { _id, role } = decoded; // Your token contains "_id", not "userId"
    if (!_id) {
      throw new AppError(
        httpStatus.UNAUTHORIZED,
        'Invalid token: User ID missing.',
      );
    }

    // Check if the user exists in the database
    const user = await UserModel.findById(_id);
    if (!user) {
      throw new AppError(httpStatus.NOT_FOUND, 'User not found!');
    }

    // Check if the user is blocked
    if (user.isBlocked) {
      throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked!');
    }

    // Check role-based access (if required roles are provided)
    if (requiredRoles.length > 0 && !requiredRoles.includes(role)) {
      throw new AppError(httpStatus.FORBIDDEN, 'You are not authorized!');
    }

    // Attach user info to request
    req.user = { _id, role }; // Attach only necessary user data to req
    next();
  });
};

export default AuthValidationMiddleware;
