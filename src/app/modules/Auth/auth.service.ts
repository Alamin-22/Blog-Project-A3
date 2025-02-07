/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { UserModel } from '../User/user.model';
import { TLoginUser, TRegisterUser } from './auth.interface';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../../config';
import { createToken } from './auth.utils';
//
const accessExpiresIn = Number(config.jwt_access_expire_In); // e.g., 86400
const refreshExpiresIn = Number(config.jwt_refresh_expire_In); // e.g., 604800
//
const createUserIntoDB = async (payload: TRegisterUser) => {
  console.log('Creating user with data:', payload);

  // Check if a user with the given email already exists
  const existingUser = await UserModel.findOne({ email: payload.email });
  if (existingUser) {
    throw new AppError(409, 'User already exists');
  }

  // Create the user with the merged data
  const createdUser = await UserModel.create(payload);

  if (!createdUser) {
    throw new AppError(500, 'User creation failed. Try again later.');
  }

  return {
    _id: createdUser._id,
    name: createdUser.name,
    email: createdUser.email,
  };
};

const loginUser = async (payload: TLoginUser) => {
  // checking if the user is exist
  const user = await UserModel.findOne({ email: payload.email });

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
  }

  // checking if the user is blocked

  const userStatus = user?.isBlocked;

  if (userStatus) {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked ! !');
  }

  //checking if the password is correct
  const isCorrectPassword = await UserModel.isPasswordMatched(
    payload?.password,
    user?.password,
  );

  if (!isCorrectPassword)
    throw new AppError(httpStatus.UNAUTHORIZED, 'Password do not matched');

  //create token and sent to the  client

  const jwtPayload = {
    email: user.email,
    role: user.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.access_secret as string,
    accessExpiresIn,
  );

  const refreshToken = createToken(
    jwtPayload,
    config.refresh_secret as string, /// this is the refresh secret
    refreshExpiresIn, // this is the refresh token expire time
  );

  return {
    accessToken,
    refreshToken,
  };
};

const refreshToken = async (token: string) => {
  console.log('Refresh Secret:', config.refresh_secret);
  console.log('Token:', token);

  // checking if the given token is valid
  const decoded = jwt.verify(
    token,
    config.refresh_secret as string,
  ) as JwtPayload;

  console.log('This is coming from the refresh Token API', decoded);

  const { email } = decoded;

  // checking if the user is exist
  const user = await UserModel.findOne(email);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
  }

  // checking if the user is blocked
  const userStatus = user?.isBlocked;

  if (userStatus) {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked ! !');
  }

  const jwtPayload = {
    email: user.email,
    role: user.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.access_secret as string,
    accessExpiresIn,
  );

  return {
    accessToken,
  };
};

export const AuthServices = {
  loginUser,
  createUserIntoDB,
  refreshToken,
};
