import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import { UserModel } from '../User/user.model';

const blockUser = async (userId: string) => {
  
  const user = await UserModel.findById(userId);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }

  if (user.isBlocked) {
    throw new AppError(httpStatus.BAD_REQUEST, 'User is already blocked');
  }

  user.isBlocked = true;
  await user.save();

  return {
    success: true,
    message: 'User blocked successfully',
    statusCode: 200,
  };
};

export const AdminService = {
  blockUser,
};
