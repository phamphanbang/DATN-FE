import { ITemplatePartCreateRequest } from "./template";

export interface ListResult<T> {
  totalCount: number;
  items: T[];
}

export interface TableFilterParams {
  maxResultCount: number;
  skipCount: number;
  sorting: string;
}

export type FormParams = Record<
  string,
  string | number | File | ITemplatePartCreateRequest[]
>;
