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
  Box,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ValidationErrorMessage } from "models/appConfig";
import { SelectFieldInput } from "common/components/Form/SelectFieldInput";
import { FormParams, TableFilterParams } from "models/app";
import { useGetAllTemplateList } from "api/apiHooks/templateHook";
import { option } from "common/types";
import { SearchableSelectField } from "common/components/SearchableSelectField";
import { useNavigate } from "react-router-dom";
import { NumberFieldInput } from "common/components/Form/NumberFieldInput";
interface ICreateModalProps {
  isOpen: boolean;
  addGroup: (num_of_groups: number, num_of_questions: number) => void;
  onClose: () => void;
}

const initialFilter: TableFilterParams = {
  maxResultCount: 999,
  skipCount: 0,
  sorting: "",
};

const CreateGroupModal = ({ isOpen, onClose, addGroup }: ICreateModalProps) => {
  const [validationError, setValidationError] = useState<
    ValidationErrorMessage[]
  >([]);
  const navigate = useNavigate();
  const { data, isLoading } = useGetAllTemplateList();
  const [formParams, setFormParams] = useState<FormParams>({
    num_of_groups: 1,
    num_of_questions: 2,
  });
  useEffect(() => {
    setFormParams({
      template_id: data?.items[0].value as string,
    });
  }, [data]);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormParams>({
    criteriaMode: "all",
  });

  const handleChangeNumberValue = (e: string, variable: string) => {
    const updatedFormParams = { ...formParams };
    const input = ["num_of_groups", "num_of_questions"];
    if (input.includes(variable)) {
      updatedFormParams[variable as keyof FormParams] = parseInt(e);
    }
    setFormParams(updatedFormParams);
  };

  const onSubmit = async () => {
    addGroup(formParams["num_of_groups"] as number, formParams["num_of_questions"] as number);
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
                  Create group questions
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
                <NumberFieldInput
                  inputKey={`num_of_groups`}
                  title="Number of groups"
                  placeholder="Enter number of groups"
                  handleChangeValue={handleChangeNumberValue}
                  register={register}
                  errors={errors}
                  validationError={validationError}
                  value={formParams["num_of_groups"] as number}
                />

                <NumberFieldInput
                  inputKey={`num_of_questions`}
                  title="Number of questions"
                  placeholder="Enter number of questions"
                  handleChangeValue={handleChangeNumberValue}
                  register={register}
                  errors={errors}
                  validationError={validationError}
                  value={formParams["num_of_questions"] as number}
                />

                <Button
                  mt="14px"
                  h="50px"
                  type="submit"
                  isLoading={isLoading}
                  w="full"
                  colorScheme="gray"
                >
                  Create
                </Button>
              </VStack>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreateGroupModal;
