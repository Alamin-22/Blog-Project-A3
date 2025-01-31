import { RequestHandler } from 'express';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import { userCreationServices } from './userCreation.service';

const createUser: RequestHandler = catchAsync(async (req, res) => {
  const { password, userData } = req.body;
  // calling service to create user

  const result = await userCreationServices.createUserIntoDB(
    password,
    userData,
  );

  // passing the response to the Reusable func
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student Created Successfully',
    data: result,
  });
});

export const userCreationControllers = { createUser };
