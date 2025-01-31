import { Schema } from 'mongoose';
import { TUser, TUserModel } from './userCreation.interface';
import bcrypt from 'bcrypt';

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
const x= "mollik"

//  to hassing password before save into DB using pre hook

userSchema.pre('save', async function (next) {
  const user = this; // (this) refers to the user Data 

  user.password = await 
});
