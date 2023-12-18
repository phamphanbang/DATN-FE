import { ListResult } from "./app";

export interface IComment {
  id: string;
  user_id: string;
  commentable_id: string;
  commentable_type: string;
  comment: string;
  created_at: string;
  updated_at: string;
  user: ICommentUser;
}

export type ICommentResult = ListResult<IComment>;

export interface ICommentUser {
  id: string;
  name: string;
  avatar: string;
}

export interface ICommentRequest {
  user_id: string;
  commentable_id: string;
  commentable_type: string;
  comment: string;
}
