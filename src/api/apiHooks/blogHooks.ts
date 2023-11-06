/* eslint-disable @typescript-eslint/no-explicit-any */
import { UserFilterParams, UserRequestResult, User, IUserUpdateRequest, IUserResetPassword } from 'models/user';
import { useCreate, useDelete, useGetList, useUpdate } from "api/apiHooks";
import { QueryKeys } from 'common/constants';
import { FormParams } from 'models/app';
import { TableFilterParams } from 'models/app';
import { Blog, BlogRequestResult, IBlogUpdateRequest } from 'models/blog';

export const useGetBlogList = (filter: TableFilterParams) => {
  return useGetList<BlogRequestResult>(
    [QueryKeys.GET_ALL_BLOGS, filter],
    '/admin/blogs',
    filter
  );
}

export const useGetBlogDetail = (id: string) => {
  return useGetList<Blog>(
    [QueryKeys.GET_BLOG, id],
    `/admin/blogs/${id}`
  );
};

export const useCreateNewBlog = () => {
  return useCreate<FormParams, any>(
    `/admin/blogs`
  )
}

export const useDeleteBlog = () => {
  return useDelete(`/admin/blogs`);
};

export const useUpdateBlog = (blogId: string, blog: IBlogUpdateRequest) => {
  return useUpdate<string, IBlogUpdateRequest, Blog>(
    `/admin/blogs`,
    blogId,
    blog, 
  );
}

