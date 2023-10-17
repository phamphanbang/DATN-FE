export interface LoginParams {
  email: string;
  password: string;
}
export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar: string;
  panel: string;
}

export interface LoginResult {
  token: string;
  name: string;
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

export interface ICreateNewUserRequest {
  // input: object
  name: string;
  role: string;
}
