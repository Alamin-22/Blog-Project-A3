// import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { RequestHandler } from 'express';
import { BlogServices } from './blog.service';

const createBlog: RequestHandler = catchAsync(async (req, res) => {
  const blogData = req.body;

  // Extract userId from req.user which is set in AuthValidationMiddleware
  const userId = req.user?._id;

  if (!userId) {
    throw new Error('User ID is missing from token');
  }

  // Pass blog data and userId to service function
  const result = await BlogServices.createBlogIntoDB(blogData, userId);

  // Sending response using reusable function
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Blog Created Successfully',
    data: result,
  });
});

const updateBlog: RequestHandler = catchAsync(async (req, res) => {
  const { id: blogId } = req.params;
  const { title, content } = req.body;

  // Extract userId from the decoded JWT token which is attached to req.user in middleware
  const userId = req.user?._id;

  // Call the blog service to update the blog.
  const result = await BlogServices.updateBlogIntoDB(
    blogId,
    { title, content },
    userId,
  );

  // Send the response using a reusable function
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Blog updated successfully',
    data: result,
  });
});

export const BlogControllers = { createBlog, updateBlog };
