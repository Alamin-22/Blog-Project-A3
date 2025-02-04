import { model, Schema } from 'mongoose';
import { TUserType } from './user.interface';

const UserSchema = new Schema<TUserType>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export const UserModel = model<TUserType>('user', UserSchema);
