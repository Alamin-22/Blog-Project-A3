import { RequestHandler } from 'express';
import catchAsync from '../../utils/catchAsync';
import { userServices } from './user.service';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';

const getAllUser: RequestHandler = catchAsync(async (req, res) => {
  const result = await userServices.getAllUserFromDB(req.query);
  // passing to the reusable func
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All User retrieve Successfully',
    data: result,
  });
});

const getSingleUser: RequestHandler = catchAsync(async (req, res) => {
  const userId = req.params.id;

  const result = await userServices.getSingleUserFromDB(userId);

  // passing to the reusable func
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User retrieve Successfully',
    data: result,
  });
});

export const userControllers = { getAllUser, getSingleUser };
