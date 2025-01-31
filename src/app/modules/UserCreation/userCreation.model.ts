import { model, Schema } from 'mongoose';
import { TUser, TUserModel } from './userCreation.interface';
import bcrypt from 'bcrypt';
import config from '../../config';

const userSchema = new Schema<TUser, TUserModel>(
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
    password: {
      type: String,
      required: true,
      select: 0, // to hide password from query Result
    },
    role: {
      type: String,
      enum: ['admin', 'user'], // using enum for strict type
      required: true,
      default: 'user',
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

//  to hassing password before save into DB using pre hook

userSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this; // (this) refers to the user Data

  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  );

  next();
});

// set empty string after saving password
userSchema.post('save', function (doc, next) {
  // after getting the updated Data I mean hashed password we have to hide it from DB By Empty String
  doc.password = '';
  next();
});

userSchema.statics.isPasswordMatched = async function (
  plainTextPassword,
  hashedPassword,
) {
  return await bcrypt.compare(plainTextPassword, hashedPassword);
};

// Create the model from the schema
export const UserModel = model<TUser, TUserModel>('User', userSchema);
