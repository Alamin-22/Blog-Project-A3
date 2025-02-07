import { ObjectId } from 'mongoose';
import AppError from '../../errors/AppError';
import { TBlog } from './blog.interface';
import { BlogModel } from './blog.model';
import QueryBuilder from '../../builder/QueryBuilder';
import { blogSearchableField } from './blog.constant';

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

const getAllBlogsFromDB = async (query: Record<string, unknown>) => {
  const blogQuery = new QueryBuilder(BlogModel.find().populate('author'), query)
    .search(blogSearchableField)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await blogQuery.modelQuery;
  return result;
};

const updateBlogIntoDB = async (
  blogId: string,
  updatedData: { title?: string; content?: string },
  userId: ObjectId,
) => {
  // Find the blog by ID
  const blog = await BlogModel.findById(blogId);
  console.log('Found blog:', blog);

  if (!blog) {
    throw new AppError(404, 'Blog not found');
  }

  const blogAuthorId =
    typeof blog.author === 'object' && blog.author._id
      ? blog.author._id
      : blog.author;

  // Check if the logged in user is the author of the blog
  if (blogAuthorId.toString() !== userId.toString()) {
    throw new AppError(403, 'You are not authorized to update this blog');
  }

  // Only update the fields if they are provided in the request.
  if (updatedData.title !== undefined) {
    blog.title = updatedData.title;
  }
  if (updatedData.content !== undefined) {
    blog.content = updatedData.content;
  }

  // Save the updated blog document
  const updatedBlog = await blog.save();

  return {
    _id: updatedBlog._id,
    title: updatedBlog.title,
    content: updatedBlog.content,
    author: updatedBlog.author,
  };
};

const deleteBlogFromDB = async (blogId: string, userId: ObjectId) => {
  // Find the blog by its ID
  const blog = await BlogModel.findById(blogId);
  if (!blog) {
    throw new AppError(404, 'Blog not found');
  }

  const blogAuthorId =
    typeof blog.author === 'object' && blog.author._id
      ? blog.author._id
      : blog.author;

  // Check if the logged in user is the author of the blog
  if (blogAuthorId.toString() !== userId.toString()) {
    throw new AppError(403, 'You are not authorized to delete this blog');
  }

  // Delete the blog from the database
  await blog.deleteOne();
  return null;
};

export const BlogServices = {
  createBlogIntoDB,
  updateBlogIntoDB,
  deleteBlogFromDB,
  getAllBlogsFromDB,
};
