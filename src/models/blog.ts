import { ListResult } from "./app";

export interface Blog {
  id: string;
  name: string;
  post: string;
  description: string;
  thumbnail: string;
}

export interface UserBlog {
  id: string;
  name: string;
  post: string;
  description: string;
  thumbnail: string;
  comments_count: number;
  created_at: string
}

export type UserBlogRequestResult = ListResult<UserBlog>;

export type BlogRequestResult = ListResult<Blog>;

export interface IBlogCreateRequest {
  name: string;
  post: string;
  description: string;
  thumbnail: File | string;
}

export interface IBlogUpdateRequest {
  name: string;
  post: string;
  description: string;
  thumbnail: File | string;
}
