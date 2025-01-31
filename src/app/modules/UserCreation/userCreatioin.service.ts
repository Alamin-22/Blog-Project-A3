/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from 'mongoose';
import { TUser } from './userCreation.interface';
import { UserModel } from './userCreation.model';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';

const createUserIntoDB = async (password: string, payload) => {
  const userData: Partial<TUser> = {};

  //   setting the User Role and password
  userData.role = 'user';
  userData.password = password;

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    // create a new user Into The User List (Transition 1)

    const newUser = await UserModel.create([userData], { session }); // => using transition

    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed To Create A User');
    }
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();

    throw new Error(err);
  }
};

export const userCreationServices = {
  createUserIntoDB,
};
