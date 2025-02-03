import mongoose from 'mongoose';
import AppError from '../../errors/AppError';
import { TUserType } from './user.interface';
import httpStatus from 'http-status';
import { UserModel } from './user.model';

const createUserIntoDB = async (password: string, payload: TUserType) => {
  const userData: Partial<TUserType> = {};
  // use Default password if pass is not provided

  // have to set user Role
  userData.role = 'user';

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    // create a user (transition 1)
    const newUser = await UserModel.create([payload], { session }); /// => using transaction

    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed To Create User');
    }

    await session.commitTransaction();
    await session.endSession();

    return newUser;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();

    throw new Error(err);
  }
};

export const userServices = { createUserIntoDB };
