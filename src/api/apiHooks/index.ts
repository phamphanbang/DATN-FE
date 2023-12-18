import { useAxios } from 'api/axiosInstant';
import { AxiosRequestConfig } from 'axios';
import { QueryKey, useMutation, useQuery } from '@tanstack/react-query';

export const useCreate = <T, U>(url: string, config?: AxiosRequestConfig) => {
  const axios = useAxios();

  const mutate = async (params: T) => {
    const data: U = await axios.post(`${url}`, params, config);
    return data;
  };

  return useMutation(mutate);
};

export const usePostWithBody = <T, D, U>(
  url: string,
  params?: T,
  body?: D,
  config?: AxiosRequestConfig
) => {
  const axios = useAxios();
  const requestBody = {
    ... body
  }

  const mutate = async () => {
    const data: U = await axios.post(`${url}`, requestBody, config);
    return data;
  };

  return useMutation(mutate);
};

export const useUpdate = <T, D, U>(
  url: string,
  params?: T,
  body?: D,
  config?: AxiosRequestConfig
) => {
  const axios = useAxios();
  const requestBody = {
    _method: "PUT",
    ... body
  }

  const mutate = async () => {
    const data: U = await axios.post(`${url}/${params}`, requestBody, config);
    return data;
  };

  return useMutation(mutate);
};

export const useUpdateMutate = <T, D, U>(
  url: string,
  params?: T,
  body?: D,
  config?: AxiosRequestConfig
) => {
  const axios = useAxios();
  // const requestBody = {
  //   _method: "PUT",
  //   ... body
  // }

  const mutate = async (b: D) => {
    const requestBody = {
      _method: "PUT",
      ... b
    }
    const data: U = await axios.post(`${url}/${params}`, requestBody, config);
    return data;
  };

  return useMutation(mutate);
};

export const useGetOne = <T>(
  key: QueryKey,
  url: string,
  config?: AxiosRequestConfig
) => {
  const axios = useAxios();

  const getData = async () => {
    const data: T = await axios.get(`${url}`, config);
    return data;
  };

  return useQuery(key, () => getData());
};

export const useGetOneWithoutCache = <T>(
  key: QueryKey,
  url: string,
  config?: AxiosRequestConfig
) => {
  const axios = useAxios();

  const getData = async () => {
    const data: T = await axios.get(`${url}`, config);
    return data;
  };

  return useQuery(key, () => getData(),{cacheTime: 0});
};

export const useDelete = (url: string) => {
  const axios = useAxios();

  const mutate = async (params: string) => {
    await axios.delete(`${url}/${params}`);
  };

  return useMutation(mutate);
};

export const useGetList = <T, D = object>(
  key: QueryKey,
  url: string,
  params?: D,
  options?: {
    enabled: boolean;
  },
  config?: AxiosRequestConfig
) => {
  const axios = useAxios();

  const getData = async () => {
    const data: T = await axios.get(`${url}`, { params, ...config });
    return data;
  };

  return useQuery(key, getData, options);
};





