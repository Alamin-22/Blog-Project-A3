import { ObjectId } from 'mongoose';
import AppError from '../../errors/AppError';
import { TBlog } from './blog.interface';
import { BlogModel } from './blog.model';

const createBlogIntoDB = async (payload: TBlog, userId: ObjectId) => {
  const newBlogData = { ...payload, author: userId };

  console.log('New Blog Data:', newBlogData);

  // Save the blog in the database
  const createdBlog = await BlogModel.create(newBlogData);

  if (!createdBlog) {
    throw new AppError(500, 'Blog creation failed. Try again later.');
  }

  // Populating the author field before returning
  const populatedBlog = await createdBlog.populate('author', 'name email'); // Populate only selected fields
  return populatedBlog;
};

export const BlogServices = {
  createBlogIntoDB,
};
