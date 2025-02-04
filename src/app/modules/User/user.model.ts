import { model, Schema } from 'mongoose';
import { TRegisterUser } from '../Auth/auth.interface';

const UserSchema = new Schema<TRegisterUser>(
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

export const UserModel = model<TRegisterUser>('user', UserSchema);
