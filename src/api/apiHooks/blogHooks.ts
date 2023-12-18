/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCreate, useDelete, useGetList, useGetOne, useUpdate } from "api/apiHooks";
import { QueryKeys } from 'common/constants';
import { FormParams } from 'models/app';
import { TableFilterParams } from 'models/app';
import { Blog, BlogRequestResult, IBlogUpdateRequest, UserBlog, UserBlogRequestResult } from 'models/blog';

export const useGetBlogList = (filter: TableFilterParams) => {
  return useGetList<BlogRequestResult>(
    [QueryKeys.GET_ALL_BLOGS, filter],
    '/admin/blogs',
    filter
  );
}

export const useGetBlogDetail = (id: string) => {
  return useGetOne<Blog>(
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


export const useUserGetBlogList = (filter: TableFilterParams) => {
  return useGetList<UserBlogRequestResult>(
    [QueryKeys.USER_GET_ALL_BLOGS, filter],
    '/blogs',
    filter
  );
}

export const useUserGetBlogDetail = (id: string) => {
  return useGetOne<UserBlog>(
    [QueryKeys.USER_GET_BLOG, id],
    `/blogs/${id}`
  );
};