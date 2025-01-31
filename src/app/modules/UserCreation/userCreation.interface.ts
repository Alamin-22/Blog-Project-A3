/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';
import { USER_ROLE } from './userCreation.constant';

export interface TUser {
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'user';
  isBlocked: boolean;
}

export interface TUserModel extends Model<TUser> {

  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean>;
}

export type TUserRole = keyof typeof USER_ROLE;