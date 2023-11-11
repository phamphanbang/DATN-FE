/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCreate, useGetList, useGetOne } from "api/apiHooks";
import { QueryKeys } from 'common/constants';
import { FormParams } from 'models/app';
import { TableFilterParams } from 'models/app';
import { Score, ScoreRequestResult } from "models/score";

export const useGetScoreList = (filter: TableFilterParams) => {
  return useGetList<ScoreRequestResult>(
    [QueryKeys.GET_ALL_SCORE, filter],
    '/admin/scores',
    filter
  );
}

export const useGetScoreDetail = (id: string) => {
  return useGetOne<Score>(
    [QueryKeys.GET_SCORE, id],
    `/admin/scores/${id}`
  );
};

export const useCreateNewScore = () => {
  return useCreate<FormParams, any>(
    `/admin/scores`
  )
}

export const useDeleteScore = () => {
    return useCreate<FormParams, any>(
      `/admin/scores/delete`
    )
  }



