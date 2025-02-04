/* eslint-disable no-unused-vars */
import { Model } from "mongoose";
import { USER_ROLE } from "./auth.constant";

export type TLoginUser = {
  id: string;
  password: string;
};

export interface TRegisterUser {
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'user';
  isBlocked: boolean;
}


export interface TUserModel extends Model<TRegisterUser> {
  isUserExistByCustomId(id: string): Promise<TRegisterUser>;

  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean>;

  isJWTIssuedBeforePasswordChanged(
    passwordChangedTimeStamp: Date,
    JwtIssuedTimeStamp: number,
  ): boolean;
}

export type TUserRole = keyof typeof USER_ROLE;
