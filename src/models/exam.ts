import { ListResult } from "./app";
import { Template } from "./template";

export interface Exam {
  id: string;
  template_id: number;
  name: string;
  total_views: number;
  status: string;
  audio: string;
  comments_count: string;
  template: Template
}

export interface ExamAdminDetail {
  id: string;
  template_id: number;
  name: string;
  total_views: number;
  status: string;
  audio: string;
  template: Template;
  parts: ExamPart[];
}

export interface ExamPart {
  id: string;
  exam_id: number;
  template_part_id: number;
  order_in_test: number;
  part_type: string;
  questions?: ExamQuestion[];
  groups?: ExamGroup[];
}

export interface ExamGroup {
  id: string;
  part_id: number;
  order_in_part: number;
  from_question: number;
  to_question: number;
  question: string;
  attachment: string;
  audio: string;
  questions: ExamQuestion[]
}

export interface ExamQuestion {
  id: string;
  part_id: number;
  group_id: number;
  order_in_test: number;
  question: string;
  attachment: string;
  audio: string;
  answers: ExamAnswer[]
}

export interface ExamAnswer {
  id: string;
  question_id: string;
  order_in_question: string;
  answer: string;
  is_right: boolean;
}
export interface ICreateExamGroupRequest {
  order_in_part: number;
  num_of_questions: number;
}

export interface ICreateExamPartRequest {
  order_in_test: number;
  template_part_id: string;
  groups?: ICreateExamGroupRequest[];
}

export interface ICreateExamRequest {
  name: string;
  template_id: string;
  parts: ICreateExamPartRequest[]
}

export interface IRenderPart {
  order_in_test: number;
  template_part_id: string;
  from_question: number;
  to_question: number;
  part_type: string;
  num_of_questions: number;
  num_of_answers: string;
  has_group_question: string;
  groups: ICreateExamGroupRequest[]
}


export interface IUpdateGroup {
  question: string;
  attachment: string | File;
  audio: string | File;
  exam_id: string;
}

export interface IUpdateExam {
  name: string;
  status: string;
  audio: string | File;
}

export interface IUpdateQuestion {
  exam_id: string;
  question: string;
  attachment: string | File;
  audio: string | File;
  answers: ExamAnswer[]
}

export type ExamRequestResult = ListResult<Exam>;


