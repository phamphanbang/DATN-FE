/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCreate, useDelete, useGetList, useGetOne, useUpdate } from "api/apiHooks";
import { QueryKeys } from 'common/constants';
import { FormParams } from 'models/app';
import { TableFilterParams } from 'models/app';
import { ExamRequestResult } from "models/exam";

export const useGetExamList = (filter: TableFilterParams) => {
  return useGetList<ExamRequestResult>(
    [QueryKeys.GET_ALL_EXAMS, filter],
    '/admin/exams',
    filter
  );
}