import { model, Schema } from 'mongoose';
import { TRegisterUser, TUserModel } from '../Auth/auth.interface';
import config from '../../config';
import bcrypt from 'bcrypt';

const UserSchema = new Schema<TRegisterUser, TUserModel>(
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
    role: {
      type: String,
      enum: ['admin', 'user'], // Use enum for strict type adherence
      required: true,
      default: 'user',
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
    toJSON: {
      transform(doc, ret) {
        // Exclude password but return all other fields
        delete ret.password;
        return ret;
      },
    },
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

UserSchema.statics.isPasswordMatched = async function (
  plainTextPassword,
  hashedPassword,
) {
  return await bcrypt.compare(plainTextPassword, hashedPassword);
};

export const UserModel = model<TRegisterUser, TUserModel>('user', UserSchema);
