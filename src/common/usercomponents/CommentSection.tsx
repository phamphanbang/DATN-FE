import { Flex, Button, VStack, Box, Image, Text } from "@chakra-ui/react";
import { TextAreaField } from "common/components/TextAreaField";
import { getImage, getItem } from "utils";
import { theme } from "themes/theme";
import {
  useCreateNewComment,
  useGetCommentList,
} from "api/apiHooks/commentHooks";
import { QueryKeys, noOfRows } from "common/constants";
import { TableFilterParams } from "models/app";
import { useState } from "react";
import { ICommentRequest } from "models/comment";
import { LocalStorageKeys } from "common/enums";
import { AxiosError } from "axios";
import { useQueryClient } from "@tanstack/react-query";
import { ErrorResponse } from "models/appConfig";
import { Pagination } from "common/components/Pagination";

interface ICommentSection {
  comment_id: string;
  comment_type: string;
}

const initialFilter: TableFilterParams = {
  maxResultCount: +noOfRows[0].value,
  skipCount: 0,
  sorting: ["id", "asc"].join(" "),
};

const CommentSection = ({ comment_id, comment_type }: ICommentSection) => {
  const userId = getItem(LocalStorageKeys.id);
  const token = getItem(LocalStorageKeys.accessToken) ?? "";
  const [filter, setFilter] = useState<TableFilterParams>(initialFilter);
  const { data, isLoading } = useGetCommentList(
    filter,
    comment_id,
    comment_type
  );
  const { items: comments = [], totalCount = 0 } = data ?? {};
  const { skipCount, maxResultCount } = filter;
  const currentPage = (maxResultCount + skipCount) / maxResultCount;
  const [comment, setComment] = useState<string>("");
  const queryClient = useQueryClient();
  const [formParams, setFormParams] = useState<ICommentRequest>({
    comment: "",
    commentable_id: comment_id,
    commentable_type: comment_type,
    user_id: userId ?? "",
  });

  const { mutateAsync: createMutate, isLoading: isCommentLoading } = useCreateNewComment();

  const onPageChange = (page: number) => {
    setFilter((filter) => ({
      ...filter,
      skipCount: filter.maxResultCount * (page - 1),
    }));
  };

  const onSubmit = async () => {
    const RequestFormParams: ICommentRequest = { ...formParams };
    RequestFormParams.comment = comment;
    try {
      await createMutate(RequestFormParams);
      queryClient.invalidateQueries({ queryKey: [QueryKeys.GET_ALL_COMMENT] });
      setComment("");
    } catch (error) {
      const err = error as AxiosError;
      // const validation = err?.response?.data as ErrorResponse;
      // setValidationError(validation.message as ValidationErrorMessage[]);
      // setIsLoading(false);
      return;
    }
  };

  return (
    <Box
      p={"15px"}
      backgroundColor={"white"}
      borderRadius={"10px"}
      border={`1px solid #c7c7c7`}
    >
      {token ? (<Flex alignItems={"center"}>
        <TextAreaField
          size={"sm"}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          padding={"6px 12px 6px 24px"}
          overflow={"auto"}
          minH={"50px"}
          placeholder="Nhập bình luận của bạn tại đây"
        />
        <Button
          _hover={{ background: "blue.800" }}
          background="blue.600"
          color="white"
          maxH={"50px"}
          onClick={() => onSubmit()}
          isLoading={isCommentLoading}
        >
          Gửi
        </Button>
      </Flex>) : (
        <Text fontStyle={'italic'}>Bạn cần đăng nhập để có thể bình luận.</Text>
      )}
      {/* <Flex alignItems={"center"}>
        <TextAreaField
          size={"sm"}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          padding={"6px 12px 6px 24px"}
          overflow={"auto"}
          minH={"50px"}
          placeholder="Nhập bình luận của bạn tại đây"
        />
        <Button
          _hover={{ background: "blue.800" }}
          background="blue.600"
          color="white"
          maxH={"50px"}
          onClick={() => onSubmit()}
          isLoading={isCommentLoading}
        >
          Gửi
        </Button>
      </Flex> */}
      <VStack alignItems={"flex-start"} my={"20px"}>
        {comments.map((comment) => {
          return (
            <Flex my={"10px"} maxW={"100%"} gap={"10px"}>
              <Box w={"50px"} display={"contents"} mx={"10px"}>
                <Image
                  boxSize="50px"
                  src={getImage(
                    "users/" + comment.user.id,
                    comment.user.avatar
                  )}
                  alt="User Avatar"
                  mx={"auto"}
                  borderRadius={"full"}
                />
              </Box>
              <Box minW={"0px"}>
                <Flex>
                  <Text fontWeight={"700"}>{comment.user.name}</Text>
                  <Text ml={"10px"}>{comment.created_at}</Text>
                </Flex>
                <Text whiteSpace={"pre-line"}>{comment.comment}</Text>
              </Box>
            </Flex>
          );
        })}
        <Pagination
          total={totalCount}
          pageSize={filter.maxResultCount}
          current={currentPage}
          onChange={onPageChange}
          hideOnSinglePage
        />
      </VStack>
    </Box>
  );
};

export default CommentSection;
