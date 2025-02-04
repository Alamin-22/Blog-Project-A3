import { RequestHandler } from 'express';

import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import { userServices } from './user.service';

const createUser: RequestHandler = catchAsync(async (req, res) => {
  const { password, user: userData } = req.body;

  console.log('this is coming from 11', req.body);

  const result = await userServices.createUserIntoDB(password, userData);

  // passing the response to the Reusable func
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User Created Successfully',
    data: result,
  });
});

export const userControllers = {
  createUser,
};
