import { createContext, useContext } from "react";
import Axios, {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
  isAxiosError,
} from "axios";
import { toast } from "common/components/StandaloneToast";
import { getItem } from "utils";
import { LocalStorageKeys } from "common/enums";
import { ErrorResponse } from "models/appConfig";

const { VITE_API_BASE_URL } = import.meta.env;

const axios = Axios.create({
  baseURL: VITE_API_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

axios.interceptors.request.use((config) => {
  const accessToken: string | null = getItem(LocalStorageKeys.accessToken);
  if (accessToken != null) {
    const accessHeader = `Bearer ${accessToken}`;
    if (config.headers != null) {
      config.headers.Authorization = accessHeader;
    }
  }
  return config;
});

axios.interceptors.response.use(
  (response) => {
    const data = response.data;
    if (response.status === 200) {
      return data;
    }

    return response;
  },
  (error: AxiosError | Error) => {
    if (isAxiosError(error)) {
      const { data } = (error.response as AxiosResponse) ?? {};
      const { message } = error;
      let errorMessage = message;
      const responseData = data as ErrorResponse;
      if (typeof responseData.message === "string") {
        errorMessage = responseData.message ? responseData.message : message;
      } else {
        errorMessage = responseData.message[0].message ? responseData.message[0].message : message;
      }

      toast({
        title: errorMessage,
        status: "error",
      });
    }
    return Promise.reject(error);
  }
);

export const AxiosContext = createContext<AxiosInstance>(
  new Proxy(axios, {
    apply: () => {
      throw new Error("You must wrap your component in an AxiosProvider");
    },
    get: () => {
      throw new Error("You must wrap your component in an AxiosProvider");
    },
  })
);

export const useAxios = () => {
  return useContext(AxiosContext);
};

export default axios;
