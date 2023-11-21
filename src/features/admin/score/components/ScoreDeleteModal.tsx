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
} from "@chakra-ui/react";
import { ChangeEvent, useState } from "react";
import { useForm } from "react-hook-form";
import { scoreType } from "common/constants";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "common/components/StandaloneToast";
import { ErrorResponse, ValidationErrorMessage } from "models/appConfig";
import { AxiosError } from "axios";
import { TextFieldInput } from "common/components/Form/TextFieldInput";
import { SelectFieldInput } from "common/components/Form/SelectFieldInput";
import { useDeleteScore } from "api/apiHooks/scoreHooks";
import { FormParams } from "models/app";

interface ICreateModalProps {
  isOpen: boolean;
  onClose: () => void;
}


const ScoreDeleteForm = ({ isOpen, onClose }: ICreateModalProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [validationError, setValidationError] = useState<
    ValidationErrorMessage[]
  >([]);
  const [formParams, setFormParams] = useState<FormParams>({
    questions: "",
    type: "reading"
  });
  const { mutateAsync: deleteMutate } = useDeleteScore();
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
    const input = ["questions", "score"];
    if (input.includes(variable)) {
      updatedFormParams[variable as keyof FormParams] = e.target.value;
    }

    setFormParams(updatedFormParams);
  };

  const handleSelectChangeValue = (value: string, variable: string) => {
    const updatedFormParams = { ...formParams };
    if (variable == "type") {
      updatedFormParams[variable] = value;
    }

    setFormParams(updatedFormParams);
  };

  const onSubmit = async () => {
    setIsLoading(true);
    const RequestFormParams: FormParams = { ...formParams };
    try {
      await deleteMutate(RequestFormParams);
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
      description: "Delete Successfully",
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
                  Delete Score
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
                  inputKey="questions"
                  title="Number of questions"
                  placeholder="Enter number of questions"
                  handleChangeValue={handleChangeValue}
                  errors={errors}
                  register={register}
                  validationError={validationError}
                />

                <SelectFieldInput
                  inputKey="type"
                  control={control}
                  errors={errors}
                  handleSelectChangeValue={handleSelectChangeValue}
                  selectOptions={scoreType}
                  title="Question type"
                  validationError={validationError}
                  value={formParams["type"] as string}
                />

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
  );
};

export default ScoreDeleteForm;
