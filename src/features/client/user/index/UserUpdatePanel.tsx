import {
  HStack,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  Button,
  VStack,
  Center,
  Spinner,
} from "@chakra-ui/react";
import { ChangeEvent, useEffect, useLayoutEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { createUserRole } from "common/constants";
import {
  useGetUserInfoDetail,
  useUpdateUser,
  useUpdateUserInfo,
} from "api/apiHooks/userHooks";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "common/components/StandaloneToast";
import { ErrorResponse, ValidationErrorMessage } from "models/appConfig";
import { AxiosError } from "axios";
import { TextFieldInput } from "common/components/Form/TextFieldInput";
import { SelectFieldInput } from "common/components/Form/SelectFieldInput";
import { IUserUpdateInfoRequest, IUserUpdateRequest, User } from "models/user";
import { FormParams } from "models/app";
import ImageFieldInput from "common/components/Form/ImageFieldInput";
import { getItem, removeItem, setItem } from "utils";
import { LocalStorageKeys } from "common/enums";

interface IUpdateModalProps {
  userId: string;
}

const UserUpdatePanel = ({ userId }: IUpdateModalProps) => {
  const [validationError, setValidationError] = useState<
    ValidationErrorMessage[]
  >([]);
  const { data, refetch } = useGetUserInfoDetail(userId);
  const [formParams, setFormParams] = useState<IUserUpdateInfoRequest>({
    name: "",
    avatar: "",
    email: "",
  });
  const {
    mutateAsync: mutate,
    isLoading,
    error,
  } = useUpdateUserInfo(userId, formParams);
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    control,
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
    if (variable == "name" || variable == "email") {
      updatedFormParams[variable] = e.target.value;
    }

    setFormParams(updatedFormParams);
  };

  const handleFileChangeValue = (
    e: ChangeEvent<HTMLInputElement>,
    variable: string
  ) => {
    const updatedFormParams = { ...formParams };
    const file = e.target.files?.[0];
    if (variable == "avatar") {
      updatedFormParams[variable] = file ?? "";
    }

    setFormParams(updatedFormParams);
  };

  const deleteAvatar = () => {
    const updatedFormParams = { ...formParams };
    updatedFormParams["avatar"] = "defaultAvatar.png";
    setFormParams(updatedFormParams);
  };

  useEffect(() => {
    // const def: IUserUpdateInfoRequest = {
    //   name: data?.name as string,
    //   email: data?.email as string,
    //   avatar: data?.avatar as string,
    // };
    // setFormParams(def);
    // setValue('name',data?.name as string);
    // setValue('email',data?.email as string);
    // setValue('avatar',data?.avatar as string);
    setData()
  }, [data]);

  const setData = async () => {
    const def: IUserUpdateInfoRequest = {
      name: data?.name as string,
      email: data?.email as string,
      avatar: data?.avatar as string,
    };
    setFormParams(def);
    setValue('name',data?.name as string);
    setValue('email',data?.email as string);
    setValue('avatar',data?.avatar as string);
  };
 
  const onSubmit = async () => {
    try {
      const data = await mutate();
      if (getItem(LocalStorageKeys.id) == userId) {
        window.dispatchEvent(new StorageEvent("storage"));
        setItem(LocalStorageKeys.avatar, data.avatar);
      }
    } catch (error) {
      const err = error as AxiosError;
      const validation = err?.response?.data as ErrorResponse;
      setValidationError(validation.message as ValidationErrorMessage[]);
      return;
    }

    if (error) {
      const err = error as AxiosError;
      const validation = err?.response?.data as ErrorResponse;
      setValidationError(validation.message as ValidationErrorMessage[]);
      return;
    }

    queryClient.clear();
    toast({
      description: "Cập nhật thông tin thành công",
      status: "success",
    });
  };

  return (
    <>
      <form
        style={{ width: "100%", marginBottom: "20px" }}
        onSubmit={handleSubmit(onSubmit)}
      >
        {false ? (
          <Center h="200px">
            <Spinner mx="auto" speed="0.65s" thickness="3px" size="xl" />
          </Center>
        ) : (
          <VStack spacing="14px" alignItems="flex-start">
            <TextFieldInput
              inputKey="name"
              title="Tên người dùng"
              placeholder="Nhập tên người dùng"
              handleChangeValue={handleChangeValue}
              errors={errors}
              register={register}
              validationError={validationError}
              defaultValue={formParams.name as string}
            />

            <TextFieldInput
              inputKey="email"
              title="Địa chỉ email"
              placeholder="Nhập địa chỉ email"
              handleChangeValue={handleChangeValue}
              errors={errors}
              register={register}
              validationError={validationError}
              defaultValue={formParams.email as string}
            />

            <ImageFieldInput
              inputKey="avatar"
              title="Ảnh đại diện"
              image={formParams.avatar}
              imagePrefix={"users/" + userId}
              imageIfNull="defaultAvatar.png"
              deleteImage={deleteAvatar}
              handleFileChangeValue={handleFileChangeValue}
            />

            <Button
              mt="14px"
              h="50px"
              type="submit"
              isLoading={isLoading}
              w="full"
              colorScheme="gray"
            >
              Cập nhật
            </Button>
          </VStack>
        )}
      </form>
    </>
  );
};

export default UserUpdatePanel;
