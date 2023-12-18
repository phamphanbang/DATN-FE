import {
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  VStack,
  Image,
} from "@chakra-ui/react";

import { ChangeEvent, useState } from "react";
import { useForm } from "react-hook-form";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "common/components/StandaloneToast";
import { ErrorResponse, ValidationErrorMessage } from "models/appConfig";
import { AxiosError } from "axios";
import { TextFieldInput } from "common/components/Form/TextFieldInput";
import { FileField } from "common/components/FileField";
import { useCreateNewBlog } from "api/apiHooks/blogHooks";
import styles from "./style.module.scss";
import TinyMCE from "common/components/TinyMCE/TinyMCE";
import { useNavigate } from "react-router-dom";
import useDebounced from "hooks/useDebounced";
import { ErrorDisplay } from "common/components/ErrorDisplay";
import { ErrorMessage } from "@hookform/error-message";
import { FormParams } from "models/app";

const BlogCreateForm = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [validationError, setValidationError] = useState<
    ValidationErrorMessage[]
  >([]);
  const [formParams, setFormParams] = useState<FormParams>({
    name: "",
    post: "",
    thumbnail: "",
    panel: "",
  });
  const [post, setPost] = useState<string>("");
  const postDebounced = useDebounced(post, 500);
  const { mutateAsync: createMutate } = useCreateNewBlog();
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormParams>({
    criteriaMode: "all",
  });

  const handleChangeValue = (
    e: ChangeEvent<HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement>,
    variable: string
  ) => {
    const updatedFormParams = { ...formParams };
    const input = ["name", "description"];
    if (input.includes(variable)) {
      updatedFormParams[variable as keyof FormParams] = e.target.value;
    }

    setFormParams(updatedFormParams);
  };

  const handleFileChangeValue = (
    e: ChangeEvent<HTMLInputElement>,
    variable: string
  ) => {
    const updatedFormParams = { ...formParams };
    const input = ["thumbnail"];
    const file = e.target.files?.[0];
    if (input.includes(variable)) {
      updatedFormParams[variable as keyof FormParams] = file ?? "";
    }

    setFormParams(updatedFormParams);
  };

  const handleEditorChange = (content: any, editor: any) => {
    setPost(content);
  };

  const onSubmit = async () => {
    setIsLoading(true);
    const RequestFormParams: FormParams = {
      ...formParams,
      post: postDebounced,
    };
    try {
      await createMutate(RequestFormParams);
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
      description: "Create Request Successfully",
      status: "success",
    });
    navigate("/admin/blogs");
  };

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
          />

          <TextFieldInput
            inputKey="description"
            title="Blog Description"
            placeholder="Enter blog description"
            handleChangeValue={handleChangeValue}
            errors={errors}
            register={register}
            validationError={validationError}
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
                // boxSize="100px"
                w={"300px"}
                h={"200px"}
                src={URL.createObjectURL(formParams.thumbnail as File)}
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

          {/* <FormControl key={"panel"}>
            <FormLabel fontSize={16} my={1} fontWeight="normal">
              Panel
              <FormHelperText my={1} style={{ color: "red" }} as="span">
                {" "}
                *
              </FormHelperText>
            </FormLabel>
            {formParams.panel && (
              <Image
                w={"300px"}
                h={"200px"}
                src={URL.createObjectURL(formParams.panel as File)}
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
          </FormControl> */}

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

export default BlogCreateForm;
