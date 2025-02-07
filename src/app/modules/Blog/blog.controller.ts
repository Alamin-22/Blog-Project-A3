// import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { RequestHandler } from 'express';
import { BlogServices } from './blog.service';

const createBlog: RequestHandler = catchAsync(async (req, res) => {
  const BlogData = req.body;

  const result = await BlogServices.createBlogIntoDB(BlogData);

  // passing the response to the Reusable func
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Blog Created Successfully',
    data: result,
  });
});

export const BlogControllers = { createBlog };
