/* eslint-disable @typescript-eslint/no-explicit-any */
import { UserFilterParams, LoginParams, LoginResult, UserRequestResult, User, IUserCreateRequest, IUserUpdateRequest } from 'models/user';
import { useCreate, useDelete, useGetList, useUpdate } from "api/apiHooks";
import { QueryKeys } from 'common/constants';
import { FormParams } from 'models/user';

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
  return useCreate<FormParams, any>(
    `/admin/users`
  )
}

export const useDeleteUser = () => {
  return useDelete(`/admin/users`);
};

export const useUpdateUser = (userId: string, user: IUserUpdateRequest) => {
  return useUpdate<string, IUserUpdateRequest, User>(
    `/admin/users`,
    userId,
    user, 
  );
}
