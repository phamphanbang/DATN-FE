import {
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  VStack,
  Image,
} from "@chakra-ui/react";

import { ChangeEvent, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "common/components/StandaloneToast";
import { ErrorResponse, ValidationErrorMessage } from "models/appConfig";
import { AxiosError } from "axios";
import { TextFieldInput } from "common/components/Form/TextFieldInput";
import { FileField } from "common/components/FileField";
import { useGetBlogDetail, useUpdateBlog } from "api/apiHooks/blogHooks";
import styles from "./style.module.scss";
import TinyMCE from "common/components/TinyMCE/TinyMCE";
import { useNavigate } from "react-router-dom";
import useDebounced from "hooks/useDebounced";
import { ErrorDisplay } from "common/components/ErrorDisplay";
import { ErrorMessage } from "@hookform/error-message";
import { getImage } from "utils";
import { IBlogUpdateRequest } from "models/blog";

export type FormParams = Record<string, string | File>;

interface IBlogUpdateForm {
  blogId: string;
}

const BlogUpdateForm = ({ blogId }: IBlogUpdateForm) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [validationError, setValidationError] = useState<
    ValidationErrorMessage[]
  >([]);
  const { data } = useGetBlogDetail(blogId);
  const [formParams, setFormParams] = useState<IBlogUpdateRequest>({
    name: "",
    post: "",
    thumbnail: "",
    panel: "",
  });
  const [post, setPost] = useState<string>("");

  useEffect(() => {
    const initValue = {
      name: data?.name as string,
      post: data?.post as string,
      thumbnail: data?.thumbnail as string,
      panel: data?.panel as string
    }
    setFormParams(initValue);
    setPost(data?.post as string);
    setValue("name",data?.name as string);
  },[data])
  
  const postDebounced = useDebounced(post, 500);
  const { mutateAsync } = useUpdateBlog(
    blogId,
    formParams
  );
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormParams>({
    criteriaMode: "all",
  });

  const handleChangeValue = (
    e: ChangeEvent<HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement>,
    variable: string
  ) => {
    const updatedFormParams = { ...formParams };
    const input = ["name"];
    if (input.includes(variable)) {
      updatedFormParams[variable as keyof IBlogUpdateRequest] = e.target.value;
    }

    setFormParams(updatedFormParams);
  };

  const handleFileChangeValue = (
    e: ChangeEvent<HTMLInputElement>,
    variable: string
  ) => {
    const updatedFormParams = { ...formParams };
    console.log("begin",updatedFormParams)
    const file = e.target.files?.[0] ?? "";
    if (variable === "panel") {
      updatedFormParams.panel = file;
    }
    if (variable === "thumbnail") {
      updatedFormParams.thumbnail = file;
    }

    setFormParams(updatedFormParams);
  };

  const handleEditorChange = (content: any, editor: any) => {
    setPost(content);
  };

  const onSubmit = async () => {
    setIsLoading(true);
    const RequestFormParams: IBlogUpdateRequest = {
      ...formParams,
      post: postDebounced,
    };
    setFormParams(RequestFormParams);
    try {
      await mutateAsync();
    } catch (error) {
      const err = error as AxiosError;
      const validation = err?.response?.data as ErrorResponse;
      setValidationError(validation.message as ValidationErrorMessage[]);
      setIsLoading(false);
      return;
    }

    queryClient.clear();
    setIsLoading(false);
    toast({
      description: "Update Request Successfully",
      status: "success",
    });
    navigate("/admin/blogs");
  };

  const renderImage = (image: string | File) => {
    if((typeof image) === "string") return getImage("blogs",image as string);
    return URL.createObjectURL(image as File)
  }

  return (
    <>
      <form className={styles.container} onSubmit={handleSubmit(onSubmit)}>
        <VStack spacing="14px" alignItems="flex-start">
          <TextFieldInput
            inputKey="name"
            title="Blog Name"
            placeholder="Enter blog name"
            handleChangeValue={handleChangeValue}
            errors={errors}
            register={register}
            validationError={validationError}
            defaultValue={formParams.name as string}
          />

          <FormControl key={"thumbnail"}>
            <FormLabel fontSize={16} my={1} fontWeight="normal">
              Thumbnail
              <FormHelperText my={1} style={{ color: "red" }} as="span">
                {" "}
                *
              </FormHelperText>
            </FormLabel>
            {formParams.thumbnail && (
              <Image
                boxSize="100px"
                src={renderImage(formParams.thumbnail)}
                alt="Blog thumbnail"
                mx={"auto"}
                my={"10px"}
              />
            )}
            <FileField
              name="thumbnail"
              accept="image/*"
              onChange={(e) => handleFileChangeValue(e, "thumbnail")}
            />
          </FormControl>

          <FormControl key={"panel"}>
            <FormLabel fontSize={16} my={1} fontWeight="normal">
              Panel
              <FormHelperText my={1} style={{ color: "red" }} as="span">
                {" "}
                *
              </FormHelperText>
            </FormLabel>
            {formParams.panel && (
              <Image
                boxSize="100px"
                src={renderImage(formParams.panel)}
                alt="Blog Panel"
                mx={"auto"}
                my={"10px"}
              />
            )}
            <FileField
              name="panel"
              accept="image/*"
              onChange={(e) => handleFileChangeValue(e, "panel")}
            />
          </FormControl>

          <FormControl key={"post"}>
            <FormLabel fontSize={16} my={1} fontWeight="normal">
              Post
              <FormHelperText my={1} style={{ color: "red" }} as="span">
                {" "}
                *
              </FormHelperText>
            </FormLabel>
            <ErrorMessage
              errors={errors}
              name={"post"}
              render={({ message }) => <ErrorDisplay message={message} />}
            />
            <TinyMCE initValue={post} handleEditorChange={handleEditorChange} />
          </FormControl>

          <Button
            mt="14px"
            h="50px"
            type="submit"
            isLoading={isLoading}
            w="full"
            colorScheme="gray"
          >
            Save
          </Button>
        </VStack>
      </form>
    </>
  );
};

export default BlogUpdateForm;
