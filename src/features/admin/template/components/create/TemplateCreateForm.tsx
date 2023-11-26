import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Button,
  VStack,
  Box,
  FormLabel,
} from "@chakra-ui/react";

import { ChangeEvent, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "common/components/StandaloneToast";
import { ErrorResponse, ValidationErrorMessage } from "models/appConfig";
import { AxiosError } from "axios";
import { TextFieldInput } from "common/components/Form/TextFieldInput";
import styles from "./style.module.scss";
import { useNavigate } from "react-router-dom";
import useDebounced from "hooks/useDebounced";
import { NumberFieldInput } from "common/components/Form/NumberFieldInput";
import { TextAreaFieldInput } from "common/components/Form/TextAreaFieldInput";
import { SelectFieldInput } from "common/components/Form/SelectFieldInput";
import {
  hasGroupQuestionType,
  numOfAnswers,
  partType,
  templateStatus,
} from "common/constants";
import { useCreateNewTemplate } from "api/apiHooks/templateHook";
import { FormParams } from "models/app";
import { ITemplatePartCreateRequest } from "models/template";
import { FaMinus, FaPlus } from "react-icons/fa";
import theme from "themes/theme";

const TemplateCreateForm = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [validationError, setValidationError] = useState<
    ValidationErrorMessage[]
  >([]);
  const [formParams, setFormParams] = useState<FormParams>({
    name: "",
    description: "",
    duration: 0,
    status: "active",
    parts: [],
    total_parts: 0,
    total_questions: 0,
    total_score: 0,
  });
  const [templateParts, setTemplateParts] = useState<
    ITemplatePartCreateRequest[]
  >([]);
  const [isAddable, setIsAddable] = useState<boolean>(true);
  const [isDeleteable, setIsDeleteable] = useState<boolean>(false);
  const { mutateAsync: createMutate } = useCreateNewTemplate();
  const queryClient = useQueryClient();
  const [tabIndex, setTabIndex] = useState<number>(0);

  const {
    register,
    unregister,
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
    const input = ["name", "description", "duration"];
    if (input.includes(variable)) {
      updatedFormParams[variable as keyof FormParams] = e.target.value;
    }

    setFormParams(updatedFormParams);
  };

  const handleSelectChangeValue = (value: string, variable: string) => {
    const updatedFormParams = { ...formParams };
    if (variable == "status") {
      updatedFormParams[variable] = value;
    }

    setFormParams(updatedFormParams);
  };

  const handleChangeNumberValue = (e: string, variable: string) => {
    const updatedFormParams = { ...formParams };
    const input = ["total_parts", "total_questions", "total_score", "duration"];
    if (input.includes(variable)) {
      updatedFormParams[variable as keyof FormParams] = e;
    }

    setFormParams(updatedFormParams);
  };

  const handleChangePartNumberValue = (e: string, v: string, index: number) => {
    const updatePart = [...templateParts];
    const variable = v.split(/_\d+$/)[0];
    if (variable === "num_of_questions") {
      updatePart[tabIndex]["num_of_questions"] = e;
    }
    // if (variable === "num_of_answers") {
    //   updatePart[tabIndex]["num_of_answers"] = e;
    // }
    setTemplateParts(updatePart);
  };

  const handleSelectChangePartValue = (value: string, v: string) => {
    const updatePart = [...templateParts];
    const variable = v.split(/_\d+$/)[0];
    if (variable === "part_type") {
      updatePart[tabIndex]["part_type"] = value;
    }
    if (variable === "has_group_question") {
      updatePart[tabIndex]["has_group_question"] = value;
    }
    if (variable === "num_of_answers") {
      updatePart[tabIndex]["num_of_answers"] = value;
    }
    setTemplateParts(updatePart);
  };

  const addPart = () => {
    const order_in_test = templateParts.length;
    const defaultPart = {
      order_in_test: order_in_test + 1,
      num_of_questions: "0",
      num_of_answers: "3",
      part_type: "reading",
      has_group_question: "false",
    };
    const newTemplateParts = [...templateParts];
    newTemplateParts.push(defaultPart);
    setTemplateParts(newTemplateParts);
  };

  const removePart = (deleteIndex: number) => {
    const deleteTemplateParts = [...templateParts];
    deleteTemplateParts.forEach((item, index) => {
      unregister(`num_of_questions_${index}`);
    });
    deleteTemplateParts.splice(deleteIndex, 1);
    const newTemplateParts = deleteTemplateParts.map((item, index) => {
      return {
        ...item,
        order_in_test: index + 1,
      };
    });
    setTemplateParts(newTemplateParts);
  };

  useEffect(() => {
    setIsAddable(false);
    setIsDeleteable(false);
    if (templateParts.length >= 7) {
      setIsAddable(true);
    }
    if (templateParts.length == 0) {
      setIsDeleteable(true);
    }
  }, [templateParts]);

  const onSubmit = async () => {
    setIsLoading(true);
    const RequestFormParams: FormParams = {
      ...formParams,
      total_parts: templateParts.length,
      parts: templateParts,
    };
    if (templateParts.length == 0) {
      setIsLoading(false);
      toast({
        description: "Number of parts cannot be 0",
        status: "error",
      });
      return;
    }
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
    navigate("/admin/templates");
  };

  return (
    <>
      <form className={styles.container} onSubmit={handleSubmit(onSubmit)}>
        <VStack spacing="14px" alignItems="flex-start">
          <TextFieldInput
            inputKey="name"
            title="Name"
            placeholder="Enter template name"
            handleChangeValue={handleChangeValue}
            errors={errors}
            register={register}
            validationError={validationError}
          />

          <TextAreaFieldInput
            inputKey="description"
            title="Description"
            placeholder="Enter template description"
            handleChangeValue={handleChangeValue}
            errors={errors}
            register={register}
            validationError={validationError}
          />

          <SelectFieldInput
            inputKey="status"
            control={control}
            errors={errors}
            handleSelectChangeValue={handleSelectChangeValue}
            selectOptions={templateStatus}
            title="Template status"
            validationError={validationError}
            value={formParams["status"] as string}
          />

          <NumberFieldInput
            inputKey="duration"
            title="Duration"
            placeholder="Enter template duration"
            handleChangeValue={handleChangeNumberValue}
            register={register}
            errors={errors}
            validationError={validationError}
            value={formParams["duration"].toString() as string}
          />

          <NumberFieldInput
            inputKey="total_questions"
            title="Total Questions"
            placeholder="Enter total questions"
            handleChangeValue={handleChangeNumberValue}
            register={register}
            errors={errors}
            validationError={validationError}
            value={formParams["total_questions"].toString() as string}
          />

          <NumberFieldInput
            inputKey="total_score"
            title="Total score"
            placeholder="Enter total score"
            handleChangeValue={handleChangeNumberValue}
            register={register}
            errors={errors}
            validationError={validationError}
            value={formParams["total_score"].toString() as string}
          />

          <Box
            w={"100%"}
            p={"10px"}
            border={`1px solid ${theme.colors.borderColor}`}
          >
            <Box
              display={"flex"}
              alignItems={"center"}
              justifyContent={"space-between"}
            >
              <FormLabel
                fontSize={15}
                my={3}
                fontWeight="medium"
                display="flex"
                alignItems="center"
                justifyContent="space-between"
              >
                Template Part
              </FormLabel>
              <Box>
                <Button
                  type="button"
                  onClick={addPart}
                  w="fit-content"
                  colorScheme="green"
                  isDisabled={isAddable}
                  leftIcon={<FaPlus />}
                >
                  Add part
                </Button>
                <Button
                  type="button"
                  colorScheme="red"
                  w="fit-content"
                  onClick={() => {
                    removePart(tabIndex);
                  }}
                  isDisabled={isDeleteable}
                  leftIcon={<FaMinus />}
                  ml="10px"
                >
                  Remove part
                </Button>
              </Box>
            </Box>
            <Tabs
              variant="soft-rounded"
              colorScheme="green"
              onChange={(index) => setTabIndex(index)}
            >
              <TabList>
                {templateParts.map((item, index) => {
                  return <Tab>Part {index + 1}</Tab>;
                })}
              </TabList>
              <TabPanels>
                {templateParts.map((item, index) => {
                  return (
                    <TabPanel>
                      <NumberFieldInput
                        inputKey={`num_of_questions_${index}`}
                        title="Number of questions"
                        placeholder="Enter number of questions"
                        handleChangeValue={handleChangePartNumberValue}
                        register={register}
                        errors={errors}
                        validationError={validationError}
                        index={index}
                        value={item["num_of_questions"] as string}
                      />
                      {/* <NumberFieldInput
                        inputKey={`num_of_answers_${index}`}
                        title="Number of answers"
                        placeholder="Enter number of answers"
                        handleChangeValue={handleChangePartNumberValue}
                        register={register}
                        errors={errors}
                        validationError={validationError}
                        index={index}
                      /> */}
                      <SelectFieldInput
                        inputKey={`num_of_answers_${index}`}
                        control={control}
                        errors={errors}
                        handleSelectChangeValue={handleSelectChangePartValue}
                        selectOptions={numOfAnswers}
                        title="Number of answers"
                        validationError={validationError}
                        value={item["num_of_answers"] as string}
                      />
                      <SelectFieldInput
                        inputKey={`part_type_${index}`}
                        control={control}
                        errors={errors}
                        handleSelectChangeValue={handleSelectChangePartValue}
                        selectOptions={partType}
                        title="Part type"
                        validationError={validationError}
                        value={item["part_type"] as string}
                      />
                      <SelectFieldInput
                        inputKey={`has_group_question_${index}`}
                        control={control}
                        errors={errors}
                        handleSelectChangeValue={handleSelectChangePartValue}
                        selectOptions={hasGroupQuestionType}
                        title="Is this part has group question"
                        validationError={validationError}
                        value={item["has_group_question"] as string}
                      />
                    </TabPanel>
                  );
                })}
              </TabPanels>
            </Tabs>
          </Box>

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

export default TemplateCreateForm;
