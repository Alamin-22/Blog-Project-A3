import { model, Schema } from 'mongoose';
import { TRegisterUser } from '../Auth/auth.interface';
import config from '../../config';
import bcrypt from 'bcrypt';

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

UserSchema.pre('save', async function (next) {
  // using pre hook to  has a  password and save intoDb

  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this; // this means currently processing data // this user refers to "doc"

  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  );

  next();
});

// set empty string after saving password
UserSchema.post('save', function (doc, next) {
  // after getting the hashed password we wil hide it from DB By Empty String
  doc.password = '';
  next();
});

export const UserModel = model<TRegisterUser>('user', UserSchema);
