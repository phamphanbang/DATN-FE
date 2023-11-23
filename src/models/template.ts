import { option } from "common/types";
import { ListResult } from "./app";

export interface TemplatePart {
  id: string;
  template_id: number;
  order_in_test: number;
  num_of_questions: number;
  num_of_answers: string;
  part_type: string;
  has_group_question: string;
}

export interface Template {
  id: string;
  name: string;
  description: string;
  duration: number;
  total_parts: number;
  total_questions: number;
  total_score: number;
  status: string;
  exams_count: number;
  parts: TemplatePart[]
}

export interface ITemplatePartCreateRequest {
  order_in_test: number;
  num_of_questions: string;
  num_of_answers: string;
  part_type: string;
  has_group_question: string;
}

export interface ITemplatePartUpdateRequest {
  id: string;
  order_in_test: number;
  num_of_questions: string;
  num_of_answers: string;
  part_type: string;
  has_group_question: string;
}

export interface ITemplateCreateRequest {
  name: string;
  description: string;
  duration: number;
  total_parts: number;
  total_questions: number;
  total_score: number;
  status: string;
  parts: ITemplatePartCreateRequest[]
}

export interface ITemplateUpdateRequest {
  name: string;
  description: string;
  duration: number;
  total_parts: number;
  total_questions: number;
  total_score: number;
  status: string;
  parts: ITemplatePartUpdateRequest[]
}

export type TemplateRequestResult = ListResult<Template>;


export type TemplateOptionResult = ListResult<option>;