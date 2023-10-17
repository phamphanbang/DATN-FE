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
  VStack
} from '@chakra-ui/react';
// import { TextField } from "common/components/TextField";
import { ChangeEvent, useState } from "react";
import { useForm } from "react-hook-form";
import { ErrorMessage } from '@hookform/error-message';
import { ErrorDisplay } from 'common/components/ErrorDisplay';
import { SearchableSelectField } from "common/components/SearchableSelectField";
import { userRole } from "common/constants";
import { useCreateNewUser } from 'api/apiHooks/userHooks';
// import { ICreateNewUserRequest } from 'models/user';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'common/components/StandaloneToast';
import { ValidationError, ValidationErrorMessage } from 'models/appConfig';
import { AxiosError } from 'axios';
import { TextFieldInput } from 'common/components/Form/TextFieldInput';

interface ICreateModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export type FormParams = Record<
  string,
  string
>;

const UserCreateForm = ({
  isOpen,
  onClose
}: ICreateModalProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [validationError, setValidationError] = useState<ValidationErrorMessage[]>([]);
  const [formParams, setFormParams] = useState<FormParams>({
    role: "user",
    name: "",
    email: "",
    password: ""
  });
  const { mutateAsync: createMutate } = useCreateNewUser();
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormParams>({
    criteriaMode: 'all',
  });

  const handleChangeValue = (
    e: ChangeEvent<HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement>,
    variable: string
  ) => {
    const updatedFormParams = { ...formParams };
    const input = ['name','email','password'];
    if (input.includes(variable)) {
      updatedFormParams[variable] = e.target.value;
    }

    setFormParams(updatedFormParams);
  };

  const handleSelectChangeValue = (
    value: string,
    variable: string
  ) => {
    const updatedFormParams = { ...formParams };
    if (variable == "role") {
      updatedFormParams[variable] = value;
    }
    // updatedFormParams[variable] = value;
    setFormParams(updatedFormParams);
  };

  const onSubmit = async () => {
    console.log("set")
    setIsLoading(true);

    const RequestFormparams: FormParams = { ...formParams }
    // console.log(RequestFormparams);
    try {
      await createMutate(RequestFormparams);
    } catch (error) {
      const err = error as AxiosError;
      const validation = err?.response?.data as ValidationError;
      setValidationError(validation.message);
      setIsLoading(false);
      return;
    }

    queryClient.clear();
    setIsLoading(false);
    toast({
      description: 'Create Request Successfully',
      status: 'success',
    });
    onClose();
  };

  // const getValidationMessage = (key: string) => {
  //   const error = validationError.find(item => item.type === key);
  //   if (error) return <ErrorDisplay message={error.message} />
  // }

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
              style={{ width: '100%', marginBottom: '20px' }}
              onSubmit={handleSubmit(onSubmit)}
            >
              <VStack spacing="14px" alignItems="flex-start">

                {/* <FormControl key={'name'}>
                  <FormLabel fontSize={16} my={1} fontWeight="normal">
                    User Name
                    <FormHelperText my={1} style={{ color: 'red' }} as="span">
                      {' '}
                      *
                    </FormHelperText>
                  </FormLabel>
                  <TextField
                    h="40px"
                    placeholder={"Enter user name"}
                    fontSize="sm"
                    {...register('name', {
                      required: `User name is Required`,
                      onChange: (e) => handleChangeValue(e, 'name'),

                    })}
                  />
                  {validationError && getValidationMessage("name")}
                  <ErrorMessage
                    errors={errors}
                    name={"name"}
                    render={({ message }) => <ErrorDisplay message={message} />}
                  />
                </FormControl> */}
                <TextFieldInput 
                  inputKey='name'
                  title='User Name'
                  placeholder='Enter user name'
                  handleChangeValue={handleChangeValue}
                  errors={errors}
                  register={register}
                  validationError={validationError}
                />

                {/* <FormControl key={'email'}>
                  <FormLabel fontSize={16} my={1} fontWeight="normal">
                    Email
                    <FormHelperText my={1} style={{ color: 'red' }} as="span">
                      {' '}
                      *
                    </FormHelperText>
                  </FormLabel>
                  <TextField
                    h="40px"
                    placeholder={"Enter user email"}
                    fontSize="sm"
                    {...register('email', {
                      required: `User email is Required`,
                      onChange: (e) => handleChangeValue(e, 'email'),
                    })}
                  />
                  <ErrorMessage
                    errors={errors}
                    name={"name"}
                    render={({ message }) => <ErrorDisplay message={message} />}
                  />
                </FormControl> */}
                <TextFieldInput 
                  inputKey='email'
                  title='User Email'
                  placeholder='Enter user email'
                  handleChangeValue={handleChangeValue}
                  errors={errors}
                  register={register}
                  validationError={validationError}
                />

                {/* <FormControl key={'password'}>
                  <FormLabel fontSize={16} my={1} fontWeight="normal">
                    User Password
                    <FormHelperText my={1} style={{ color: 'red' }} as="span">
                      {' '}
                      *
                    </FormHelperText>
                  </FormLabel>
                  <TextField
                    h="40px"
                    placeholder={"Enter user password"}
                    fontSize="sm"
                    {...register('password', {
                      required: `User password is Required`,
                      onChange: (e) => handleChangeValue(e, 'password'),
                    })}
                  />
                  <ErrorMessage
                    errors={errors}
                    name={"name"}
                    render={({ message }) => <ErrorDisplay message={message} />}
                  />
                </FormControl> */}
                <TextFieldInput 
                  inputKey='password'
                  title='User Password'
                  placeholder='Enter user password'
                  handleChangeValue={handleChangeValue}
                  errors={errors}
                  register={register}
                  validationError={validationError}
                />

                <FormControl key={'role'}>
                  <FormLabel
                    fontSize={16}
                    my={1}
                    fontWeight="normal"
                  >
                    User Role
                    <FormHelperText my={1} style={{ color: 'red' }} as="span">
                      {' '}
                      *
                    </FormHelperText>

                  </FormLabel>
                  <SearchableSelectField
                    name={'role'}
                    control={control}
                    options={userRole}
                    value={formParams['role'] as string}
                    handleChange={handleSelectChangeValue}
                  />

                  <ErrorMessage
                    errors={errors}
                    name={"role"}
                    render={({ message }) => <ErrorDisplay message={message} />}
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
                  Save
                </Button>
              </VStack>

            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

export default UserCreateForm;