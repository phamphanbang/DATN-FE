/* eslint-disable @typescript-eslint/no-explicit-any */
import { useGetList } from "api/apiHooks";
import { QueryKeys } from "common/constants";
import { TableFilterParams } from "models/app";
import { IHomeResult } from "models/home";

export const useGetHomepage = (filter: TableFilterParams) => {
  return useGetList<IHomeResult>(
    [QueryKeys.USER_GET_HOMEPAGE, filter],
    "/home",
    filter
  );
};
