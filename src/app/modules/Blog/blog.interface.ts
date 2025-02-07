import mongoose from "mongoose";

export interface TBlog {
  title: string;
  content: string;
  author: mongoose.Types.ObjectId; // Reference to the User Model
  isPublished: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
