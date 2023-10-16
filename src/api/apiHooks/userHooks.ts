/* eslint-disable @typescript-eslint/no-explicit-any */
import { UserFilterParams, LoginParams, LoginResult, UserRequestResult, User, ICreateNewUserRequest } from 'models/user';
import { useCreate, useGetList } from "api/apiHooks";
import { QueryKeys } from 'common/constants';

export const useLogin = () => {
  return useCreate<LoginParams, LoginResult>('/admin/auth/login');
};

export const useGetUserList = (filter: UserFilterParams) => {
  return useGetList<UserRequestResult>(
    [QueryKeys.GET_ALL_USERS, filter],
    '/admin/users',
    filter
  );
}

export const useGetUserDetail = (id: string) => {
  return useGetList<User>(
    [QueryKeys.GET_USER, id],
    `/admin/users/${id}`
  );
};

export const useCreateNewUser = () => {
  return useCreate<ICreateNewUserRequest, any>(
    `/admin/users`
  )
}
