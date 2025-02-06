import { RequestHandler } from 'express';
import catchAsync from '../../utils/catchAsync';
import { userServices } from './user.service';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';

// we are moving out our try catch logic to this func=> this is called higher order func
const getAllUser: RequestHandler = catchAsync(async (req, res) => {
  const result = await userServices.getAllUserFromDB(req.query);
  // passing to the reusable func
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'user retrieve Successfully',
    data: result,
  });
});

export const userControllers = { getAllUser };
