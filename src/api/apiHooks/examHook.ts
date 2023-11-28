/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCreate, useDelete, useGetList, useGetOne, useUpdate } from "api/apiHooks";
import { QueryKeys } from 'common/constants';
import { FormParams } from 'models/app';
import { TableFilterParams } from 'models/app';
import { ExamAdminDetail, ExamQuestion, ExamRequestResult, ICreateExamRequest, IUpdateExam, IUpdateGroup, IUpdateQuestion } from "models/exam";

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
  return useUpdate<string, IUpdateExam, IUpdateExam>(
    `/admin/exams`,
    examId,
    exam, 
  );
}