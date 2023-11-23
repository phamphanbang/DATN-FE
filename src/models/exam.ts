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

export interface Exam_parts {
  id: string;
  exam_id: number;
  template_part_id: number;
  order_in_test: number;
}

export interface Exam_groups {
  id: string;
  part_id: number;
  order_in_part: number;
  from_question: number;
  to_question: number;
  question: string;
  attachment: string;
  audio: string;
}

export type ExamRequestResult = ListResult<Exam>;


