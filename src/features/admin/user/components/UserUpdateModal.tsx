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
  FormControl,
  FormHelperText,
  FormLabel,
  VStack,
  Image,
} from "@chakra-ui/react";
import { ChangeEvent, useState } from "react";
import { useForm } from "react-hook-form";
import { userRole } from "common/constants";
import { useUpdateUser } from "api/apiHooks/userHooks";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "common/components/StandaloneToast";
import { ErrorResponse, ValidationErrorMessage } from "models/appConfig";
import { AxiosError } from "axios";
import { TextFieldInput } from "common/components/Form/TextFieldInput";
import { SelectFieldInput } from "common/components/Form/SelectFieldInput";
import { FileField } from "common/components/FileField";
import { IUserUpdateRequest } from "models/user";
import { getImage } from "utils";
import { FormParams } from "models/app";

interface IUpdateModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialValues: IUserUpdateRequest;
  userId: string;
}

const UserUpdateForm = ({
  isOpen,
  onClose,
  initialValues,
  userId,
}: IUpdateModalProps) => {
  const [validationError, setValidationError] = useState<
    ValidationErrorMessage[]
  >([]);
  const [formParams, setFormParams] =
    useState<IUserUpdateRequest>(initialValues);
  const { mutateAsync: mutate, isLoading, error } = useUpdateUser(
    userId,
    formParams
  );
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
    if (variable == "name" || variable == "email") {
      updatedFormParams[variable] = e.target.value;
    }

    setFormParams(updatedFormParams);
  };

  const handleSelectChangeValue = (value: string, variable: string) => {
    const updatedFormParams = { ...formParams };
    if (variable == "role") {
      updatedFormParams[variable] = value;
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

  const onSubmit = async () => {
    try {
      await mutate();
    } catch (error) {
      console.log(error);
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
      description: "Update User Successfully",
      status: "success",
    });
    onClose();
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent p="10px" maxW="700px">
          <ModalHeader>
            <HStack>
              <Heading ml={1} w="550px">
                <Text fontSize={18} fontWeight={400} mt={1.5}>
                  Create New User
                </Text>
              </Heading>
            </HStack>
          </ModalHeader>
          <ModalCloseButton mt="15px" mr="10px" />
          <ModalBody>
            <form
              style={{ width: "100%", marginBottom: "20px" }}
              onSubmit={handleSubmit(onSubmit)}
            >
              <VStack spacing="14px" alignItems="flex-start">
                <TextFieldInput
                  inputKey="name"
                  title="User Name"
                  placeholder="Enter user name"
                  handleChangeValue={handleChangeValue}
                  errors={errors}
                  register={register}
                  validationError={validationError}
                  defaultValue={formParams.name as string}
                />

                <TextFieldInput
                  inputKey="email"
                  title="User Email"
                  placeholder="Enter user email"
                  handleChangeValue={handleChangeValue}
                  errors={errors}
                  register={register}
                  validationError={validationError}
                  defaultValue={formParams.email as string}
                />

                {/* <TextFieldInput
                  inputKey="password"
                  title="User Password"
                  placeholder="Enter user password"
                  handleChangeValue={handleChangeValue}
                  errors={errors}
                  register={register}
                  validationError={validationError}
                  defaultValue={formParams.password as string}
                /> */}

                <SelectFieldInput
                  inputKey="role"
                  control={control}
                  errors={errors}
                  handleSelectChangeValue={handleSelectChangeValue}
                  selectOptions={userRole}
                  title="User Role"
                  validationError={validationError}
                  value={formParams.role as string}
                />

                <FormControl key={"avatar"}>
                  <FormLabel fontSize={16} my={1} fontWeight="normal">
                    Avatar
                    <FormHelperText my={1} style={{ color: "red" }} as="span">
                      {" "}
                      *
                    </FormHelperText>
                  </FormLabel>
                  {formParams.avatar && (
                    <Image
                      boxSize="200px"
                      src={
                        typeof formParams.avatar === "string"
                          ? getImage("users", formParams.avatar)
                          : URL.createObjectURL(formParams.avatar as File)
                      }
                      alt="User Avatar"
                      mx={"auto"}
                      my={"10px"}
                      borderRadius={'full'}
                    />
                  )}

                  <FileField
                    name="avatar"
                    accept="image/*"
                    onChange={(e) => handleFileChangeValue(e, "avatar")}
                  />
                </FormControl>

                <Button
                  mt="14px"
                  h="50px"
                  type="submit"
                  isLoading={isLoading}
                  w="full"
                  colorScheme="gray"
                >
                  Update
                </Button>
              </VStack>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default UserUpdateForm;
