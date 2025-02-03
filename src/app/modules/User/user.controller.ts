import { RequestHandler } from 'express';

import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import { userServices } from './user.service';

const createUser: RequestHandler = catchAsync(async (req, res) => {
  const { password, student: studentData } = req.body;

  const result = await userServices.createUserIntoDB(password, studentData);

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
