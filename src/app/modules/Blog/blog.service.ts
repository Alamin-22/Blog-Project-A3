import AppError from '../../errors/AppError';
import { TBlog } from './blog.interface';
import { BlogModel } from './blog.model';

const createBlogIntoDB = async (payload: TBlog) => {
  const createdBlog = await BlogModel.create(payload);

  if (!createdBlog) {
    throw new AppError(500, 'Blog creation failed. Try again later.');
  }

  return createdBlog;
};

export const BlogServices = {
  createBlogIntoDB,
};
