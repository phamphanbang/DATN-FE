/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCreate, useDelete, useGetList, useGetOne, useUpdate } from "api/apiHooks";
import { QueryKeys } from "common/constants";
import { IHomeResult } from "models/home";

export const useGetHomepage = () => {
    return useGetList<IHomeResult>(
      [],
      '/home'
    );
  }