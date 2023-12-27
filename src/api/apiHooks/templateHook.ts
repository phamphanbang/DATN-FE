/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  useCreate,
  useDelete,
  useGetList,
  useGetOne,
  useUpdate,
} from "api/apiHooks";
import { QueryKeys } from "common/constants";
import { FormParams } from "models/app";
import { TableFilterParams } from "models/app";
import {
  ITemplateUpdateRequest,
  Template,
  TemplateOptionResult,
  TemplateRequestResult,
} from "models/template";

export const useGetTemplateList = (filter: TableFilterParams) => {
  return useGetList<TemplateRequestResult>(
    [QueryKeys.GET_ALL_TEMPLATE, filter],
    "/admin/templates",
    filter
  );
};

export const useGetAllTemplateList = () => {
  return useGetOne<TemplateOptionResult>(
    [QueryKeys.GET_ALL_TEMPLATE_WITHOUT_PART],
    "/templates/getAllTemplates"
  );
};

export const useCreateNewTemplate = () => {
  return useCreate<FormParams, any>(`/admin/templates`);
};

export const useDeleteTemplate = () => {
  return useDelete(`/admin/templates`);
};

export const useGetTemplateDetail = (id: string) => {
  return useGetOne<Template>(
    [QueryKeys.GET_TEMPLATE, id],
    `/admin/templates/${id}`
  );
};

export const useUpdateTemplate = (
  template_id: string,
  template: ITemplateUpdateRequest
) => {
  return useUpdate<string, ITemplateUpdateRequest, Template>(
    `/admin/templates`,
    template_id,
    template
  );
};
