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
interface ICreateModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const initialFilter: TableFilterParams = {
  maxResultCount: 999,
  skipCount: 0,
  sorting: "",
};

const ExamCreateModal = ({ isOpen, onClose }: ICreateModalProps) => {
  const [validationError, setValidationError] = useState<
    ValidationErrorMessage[]
  >([]);
  const { data, isLoading } = useGetAllTemplateList();
  const [formParams, setFormParams] = useState<FormParams>({
    template_id: "",
  });
  useEffect(() => {
    setFormParams({
      template_id: data?.items[0].value as string
    })
  },[data])

  const getOptions = () => {
    return data?.items?.map((option: option) => ({
      value: option?.value,
      label: option?.label,
    }));
  };

  const defaultValue = () => {
    return formParams['template_id'] ?? data?.items[0].value;
  }

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormParams>({
    criteriaMode: "all",
  });

  const handleSelectChangeValue = (value: string, variable: string) => {
    const updatedFormParams = { ...formParams };
    if (variable == "template_id") {
      updatedFormParams[variable] = value;
    }
    // updatedFormParams[variable] = value;
    setFormParams(updatedFormParams);
  };

  const onSubmit = async () => {};

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent p="10px" maxW="700px">
          <ModalHeader>
            <HStack>
              <Heading ml={1} w="550px">
                <Text fontSize={18} fontWeight={400} mt={1.5}>
                  Select exam template to generate create form
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
                <SelectFieldInput
                  inputKey="template_id"
                  control={control}
                  errors={errors}
                  handleSelectChangeValue={handleSelectChangeValue}
                  selectOptions={getOptions() ?? [{ value: "", label: "" }]}
                  title="Select your exam template"
                  validationError={validationError}
                  value={defaultValue() as string}
                />

                <Button
                  mt="14px"
                  h="50px"
                  type="submit"
                  isLoading={isLoading}
                  w="full"
                  colorScheme="gray"
                >
                  Move to create page
                </Button>
              </VStack>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ExamCreateModal;
