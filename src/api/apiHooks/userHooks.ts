/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  UserFilterParams,
  LoginParams,
  LoginResult,
  UserRequestResult,
  User,
  IUserUpdateRequest,
  IUserResetPassword,
  RegisterParams,
  IUserUpdateInfoRequest,
  IUserResetInfoPassword,
} from "models/user";
import { useCreate, useDelete, useGetList, useUpdate } from "api/apiHooks";
import { QueryKeys } from "common/constants";
import { FormParams } from "models/app";

export const useLogin = () => {
  return useCreate<LoginParams, LoginResult>("/admin/auth/login");
};

export const useGetUserList = (filter: UserFilterParams) => {
  return useGetList<UserRequestResult>(
    [QueryKeys.GET_ALL_USERS, filter],
    "/admin/users",
    filter
  );
};

export const useGetUserDetail = (id: string) => {
  return useGetList<User>([QueryKeys.GET_USER, id], `/admin/users/${id}`);
};

export const useCreateNewUser = () => {
  return useCreate<FormParams, any>(`/admin/users`);
};

export const useDeleteUser = () => {
  return useDelete(`/admin/users`);
};

export const useUpdateUser = (userId: string, user: IUserUpdateRequest) => {
  return useUpdate<string, IUserUpdateRequest, User>(
    `/admin/users`,
    userId,
    user
  );
};

export const useResetPassword = (
  userId: string,
  password: IUserResetPassword
) => {
  return useUpdate<string, IUserResetPassword, User>(
    `/admin/users/reset-password`,
    userId,
    password
  );
};

//user
export const useUserLogin = () => {
  return useCreate<LoginParams, LoginResult>("/auth/login");
};

export const useUserRegister = () => {
  return useCreate<RegisterParams, LoginResult>("/auth/register");
};

export const useUpdateUserInfo = (
  userId: string,
  user: IUserUpdateInfoRequest
) => {
  return useUpdate<string, IUserUpdateInfoRequest, User>(
    `/users`,
    userId,
    user
  );
};

export const useGetUserInfoDetail = (id: string) => {
  return useGetList<User>([QueryKeys.GET_USER, id], `/users/${id}`);
};

export const useResetInfoPassword = (
  userId: string,
  password: IUserResetInfoPassword
) => {
  return useUpdate<string, IUserResetInfoPassword, User>(
    `/users/reset-password`,
    userId,
    password
  );
};
