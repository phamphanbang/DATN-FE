/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCreate, useDelete, useGetList, useGetOne, useGetOneWithoutCache, usePostWithBody, useUpdate, useUpdateMutate } from "api/apiHooks";
import { QueryKeys } from 'common/constants';
import { TableFilterParams } from 'models/app';
import { ExamAdminDetail, ExamHistoryDetail, ExamRequestResult, HistoryRequestResult, ICreateExamRequest, IExamRequest, IExamResponse, IUpdateExam, IUpdateGroup, IUpdateQuestion, IUserExamDetail, IUserExamForTest, IUserGetExamRequest } from "models/exam";

export const useGetExamList = (filter: TableFilterParams) => {
  return useGetList<ExamRequestResult>(
    [QueryKeys.GET_ALL_EXAMS, filter],
    '/admin/exams',
    filter
  );
}

export const useCreateNewExam = () => {
  return useCreate<ICreateExamRequest, any>(
    `/admin/exams`
  )
}

export const useDeleteExams = () => {
  return useDelete(`/admin/exams`);
};

export const useGetExamDetail = (id: string) => {
  return useGetOne<ExamAdminDetail>(
    [QueryKeys.GET_EXAM, id],
    `/admin/exams/${id}`
  );
};

export const useUpdateQuestion = (questionId: string, question: IUpdateQuestion) => {
  return useUpdate<string, IUpdateQuestion, IUpdateQuestion>(
    `/admin/exams/questions`,
    questionId,
    question, 
  );
}

export const useUpdateGroup = (groupId: string, group: IUpdateGroup) => {
  return useUpdate<string, IUpdateGroup, IUpdateGroup>(
    `/admin/exams/groups`,
    groupId,
    group, 
  );
}

export const useUpdateExam = (examId: string, exam: IUpdateExam) => {
  return useUpdateMutate<string, IUpdateExam, IUpdateExam>(
    `/admin/exams`,
    examId,
    exam, 
  );
}

export const useUserGetExamList = (filter: TableFilterParams) => {
  return useGetList<ExamRequestResult>(
    [QueryKeys.USER_GET_ALL_EXAMS, filter],
    '/exams',
    filter
  );
}

// export const useGetUserExamDetail = (id: string,user_id: string) => {
//   return useGetOne<IUserExamDetail>(
//     [QueryKeys.USER_GET_EXAM],
//     `/exams/${id}?user=${user_id}`
//   );
// };
export const useGetUserExamDetail = (id: string,user_id: string) => {
  return useGetOneWithoutCache<IUserExamDetail>(
    [QueryKeys.USER_GET_EXAM,id],
    `/exams/${id}?user=${user_id}`
  );
};

export const useUserGetExamForTest = (id:string) => {
  return useCreate<IUserGetExamRequest, IUserExamForTest>(
    `/exams/` + id + '/getExamForTest'
  )
}

export const useUserSubmitExam = (id: string,exam:IExamRequest) => {
  return usePostWithBody<string,IExamRequest, IExamResponse>(
    `/exams/` + id + '/submit',
    id,
    exam
  )
}

export const useGetHistoryDetail = (exam_id: string,history_id: string) => {
  return useGetOne<ExamHistoryDetail>(
    [QueryKeys.USER_GET_HISTORY_DETAIL, history_id],
    `/exams/${exam_id}/history/${history_id}`
  )
}

export const useGetHistoryList = (user_id: string,filter: TableFilterParams) => {
  return useGetList<HistoryRequestResult>(
    [QueryKeys.USER_GET_ALL_HISTORY, filter],
    `/users/${user_id}/history`,
    filter
  );
}