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
import { TextField } from "common/components/TextField";
import { ChangeEvent, useState } from "react";
import { useForm } from "react-hook-form";
import { ErrorMessage } from '@hookform/error-message';
import { ErrorDisplay } from 'common/components/ErrorDisplay';
import { SearchableSelectField } from "common/components/SearchableSelectField";
import { userRole } from "common/constants";
import { useCreateNewUser } from 'api/apiHooks/userHooks';
import { ICreateNewUserRequest } from 'models/user';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'common/components/StandaloneToast';

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
  const [formParams, setFormParams] = useState<FormParams>({
    role: "user",
    name: ""
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
    updatedFormParams[variable] = e.target.value;
    setFormParams(updatedFormParams);
  };

  const handleSelectChangeValue = (
    value: string, 
    variable: string
    ) => {
    const updatedFormParams = { ...formParams };
    updatedFormParams[variable] = value;
    setFormParams(updatedFormParams);
  };

  const onSubmit = async () => {
    console.log("set")
    setIsLoading(true);

    const RequestFormparams : ICreateNewUserRequest = {
      input: { ...formParams }
    }
    console.log(RequestFormparams);
    await createMutate(RequestFormparams);
    queryClient.clear();
    setIsLoading(false);
    toast({
      description: 'Create Request Successfully',
      status: 'success',
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
              style={{ width: '100%', marginBottom: '20px' }}
              onSubmit={handleSubmit(onSubmit)}
            >
              <VStack spacing="14px" alignItems="flex-start">

                <FormControl key={'name'}>
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
                  <ErrorMessage
                    errors={errors}
                    name={"name"}
                    render={({ message }) => <ErrorDisplay message={message} />}
                  />
                </FormControl>

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
                    name={'role'}
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