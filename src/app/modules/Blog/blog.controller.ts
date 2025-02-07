// import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { RequestHandler } from 'express';
import { BlogServices } from './blog.service';

const createBlog: RequestHandler = catchAsync(async (req, res) => {
  const BlogData = req.body;
  const userId = req.cookies;

  console.log('user id is decoded from the cookie', userId);

  const result = await BlogServices.createBlogIntoDB(BlogData, userId);

  // passing the response to the Reusable func
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Blog Created Successfully',
    data: result,
  });
});

export const BlogControllers = { createBlog };
