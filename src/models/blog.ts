import { ListResult } from "./app";

export interface Blog {
  id: string;
  name: string;
  post: string;
  panel: string;
  thumbnail: string;
}

export type BlogRequestResult = ListResult<Blog>;

export interface IBlogCreateRequest {
  name: string;
  post: string;
  panel: File | string;
  thumbnail: File | string;
}

export interface IBlogUpdateRequest {
  name: string;
  post: string;
  panel: File | string;
  thumbnail: File | string;
}
