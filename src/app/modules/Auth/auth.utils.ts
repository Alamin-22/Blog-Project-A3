import jwt from 'jsonwebtoken';
import { Types } from 'mongoose';

export const createToken = (
  jwtPayload: { _id: Types.ObjectId; email: string; role: string },
  secret: string,
  expiresIn: number,
) => {
  return jwt.sign(jwtPayload, secret, {
    expiresIn,
  });
};
