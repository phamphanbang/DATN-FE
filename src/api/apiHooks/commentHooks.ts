import { QueryKeys } from "common/constants";
import { TableFilterParams } from "models/app";
import { useGetList, useCreate } from ".";
import { ICommentRequest, ICommentResult } from "models/comment";


export const useGetCommentList = (filter: TableFilterParams,id:string,type:string) => {
    return useGetList<ICommentResult>(
      [QueryKeys.GET_ALL_COMMENT, filter],
      '/comments/'+id+"/"+type,
      filter
    );
  }
  
  export const useCreateNewComment = () => {
    return useCreate<ICommentRequest, any>(
      `/comments`
    )
  }