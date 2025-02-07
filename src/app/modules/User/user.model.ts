/* eslint-disable @typescript-eslint/no-this-alias */
import { model, Schema } from 'mongoose';
import { TRegisterUser, TUserModel } from '../Auth/auth.interface';
import config from '../../config';
import bcrypt from 'bcrypt';

//User Schema
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
      enum: ['admin', 'user'], // Using enum for strict type adherence
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

// Pre-save hook to hash password before saving
UserSchema.pre('save', async function (next) {
  const user = this; // This refers to the document being saved
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  );
  next();
});

// Post-save hook to clear password after saving
UserSchema.post('save', function (doc, next) {
  doc.password = ''; // Hide the password after saving
  next();
});

// Static method to check password match
UserSchema.statics.isPasswordMatched = async function (
  plainTextPassword,
  hashedPassword,
) {
  return await bcrypt.compare(plainTextPassword, hashedPassword);
};

// Ensure unique email index is created
UserSchema.index({ email: 1 }, { unique: true });

// Create and export the User model
export const UserModel = model<TRegisterUser, TUserModel>('User', UserSchema);
