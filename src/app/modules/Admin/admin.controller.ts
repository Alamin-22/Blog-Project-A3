import { RequestHandler } from 'express';
import { AdminService } from './admin.service';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';

const blockUser: RequestHandler = catchAsync(async (req, res) => {
  const { userId } = req.params;

  const result = await AdminService.blockUser(userId);

  // Sending response using reusable function
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'User blocked successfully',
    data: result,
  });
});

export const AdminController = {
  blockUser,
};
