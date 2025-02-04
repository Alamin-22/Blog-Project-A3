/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from 'mongoose';
import AppError from '../../errors/AppError';
import { TUserType } from './user.interface';
import httpStatus from 'http-status';
import { UserModel } from './user.model';

const createUserIntoDB = async (password: string, payload: TUserType) => {
  // Merge the default role into payload
  const userData: TUserType = {
    ...payload,
    role: 'user', // default role assignment
  };

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    // create a user (transaction 1)
    const newUser = await UserModel.create([userData], { session });

    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed To Create User');
    }

    await session.commitTransaction();
    await session.endSession();

    return newUser;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};

export const userServices = { createUserIntoDB };
