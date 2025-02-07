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

  // returning only selected filed to the api Response
  return {
    _id: populatedBlog._id,
    title: populatedBlog.title,
    content: populatedBlog.content,
    author: populatedBlog.author,
  };
};

const updateBlogIntoDB = async (
  blogId: string,
  updatedData: { title: string; content: string },
  userId: ObjectId,
) => {
  // Find the blog by ID
  const blog = await BlogModel.findById(blogId);

  console.log('getting the blog using id', blog);

  if (!blog) {
    throw new AppError(404, 'Blog not found');
  }

  // Check if the logged-in user is the author of the blog
  if (blog.author._id.toString() !== userId.toString()) {
    throw new AppError(403, 'You are not authorized to update this blog');
  }

  // Update the blog with the new title and content
  blog.title = updatedData.title;
  blog.content = updatedData.content;

  // Save the updated blog
  const updatedBlog = await blog.save();

  return updatedBlog;
};

export const BlogServices = {
  createBlogIntoDB,
  updateBlogIntoDB,
};
