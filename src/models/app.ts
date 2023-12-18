import { ICreateExamPartRequest } from "./exam";
import { ITemplatePartCreateRequest } from "./template";

export interface ListResult<T> {
  totalCount: number;
  items: T[];
}

export interface TableFilterParams {
  maxResultCount: number;
  skipCount: number;
  sorting: string;
  search?: string;
  user?: string;
  type?: string
  time?: number
}

export type FormParams = Record<
  string,
  | string
  | number
  | File
  | ITemplatePartCreateRequest[]
  | ICreateExamPartRequest[]
>;
