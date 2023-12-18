import { ValidationErrorMessage } from "./appConfig";

export interface LoginParams {
  email: string;
  password: string;
}

export interface RegisterParams {
  email: string;
  password: string;
  name: string;
  confirm_password: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar: string;
}

export interface dataLogin {
  token: string;
  name: string;
  isAdmin: string;
  avatar: string;
  id: string;
}

export interface LoginResult {
  data?: dataLogin;
  message: string | ValidationErrorMessage[];
  status: string;
}

export interface ListResult<T> {
  totalCount: number;
  items: T[];
}

export type UserRequestResult = ListResult<User>;

export interface UserFilterParams {
  maxResultCount: number;
  skipCount: number;
  sorting: string;
}

export interface IUserCreateRequest {
  role: string;
  name: string;
  email: string;
  password: string;
  avatar: File | string;
}

export interface IUserUpdateRequest {
  role: string;
  name: string;
  email: string;
  avatar: File | string;
}

export interface IUserUpdateInfoRequest {
  name: string;
  email: string;
  avatar: File | string;
}

export interface IUserResetPassword {
  password: string;
}

export interface IUserResetInfoPassword {
  password: string;
  confirm_password: string;
}