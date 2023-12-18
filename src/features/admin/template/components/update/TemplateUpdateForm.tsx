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
import { NumberFieldInput } from "common/components/Form/NumberFieldInput";
import { TextAreaFieldInput } from "common/components/Form/TextAreaFieldInput";
import { SelectFieldInput } from "common/components/Form/SelectFieldInput";
import {
  hasGroupQuestionType,
  numOfAnswers,
  partType,
  templateStatus,
} from "common/constants";
import {
  useCreateNewTemplate,
  useGetTemplateDetail,
  useUpdateTemplate,
} from "api/apiHooks/templateHook";
import { FormParams } from "models/app";
import {
  ITemplatePartCreateRequest,
  ITemplatePartUpdateRequest,
  ITemplateUpdateRequest,
  TemplatePart,
} from "models/template";
import { FaMinus, FaPlus } from "react-icons/fa";
import theme from "themes/theme";

interface ITemplateUpdateForm {
  templateId: string;
}

const TemplateUpdateForm = ({ templateId }: ITemplateUpdateForm) => {
  const navigate = useNavigate();
  const { data } = useGetTemplateDetail(templateId);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const [validationError, setValidationError] = useState<
    ValidationErrorMessage[]
  >([]);
  const [formParams, setFormParams] = useState<ITemplateUpdateRequest>({
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
    ITemplatePartUpdateRequest[]
  >([]);
  const [isAddable, setIsAddable] = useState<boolean>(true);
  const [isDeleteable, setIsDeleteable] = useState<boolean>(false);
  const { mutateAsync } = useUpdateTemplate(templateId, formParams);
  const queryClient = useQueryClient();
  const [tabIndex, setTabIndex] = useState<number>(0);

  const {
    register,
    unregister,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<FormParams>({
    criteriaMode: "all",
  });

  useEffect(() => {
    const initValue = {
      name: data?.name as string,
      description: data?.description as string,
      duration: data?.duration as number,
      status: data?.status as string,
      parts: data?.parts as any,
      total_parts: data?.total_parts as number,
      total_questions: data?.total_questions as number,
      total_score: data?.total_score as number,
    };
    setFormParams(initValue);
    const isFormUpdateable =
      data?.exams_count && data?.exams_count > 0 ? true : false;
    setIsDisabled(isFormUpdateable);
    const newTemplateParts = data?.parts.map((item, index) => {
      return {
        id: item.id,
        order_in_test: item.order_in_test,
        num_of_questions: item.num_of_questions.toString(),
        num_of_answers: item.num_of_answers.toString(),
        part_type: item.part_type.toString(),
        has_group_question:
          item.has_group_question.toString() === "1" ? "true" : "false",
      };
    });
    setTemplateParts(newTemplateParts as ITemplatePartUpdateRequest[]);
    setValue("name", data?.name as string);
    setValue("description", data?.description as string);
    setValue("total_questions", data?.total_questions as number);
    setValue("total_score", data?.total_score as number);
    setValue("duration", data?.duration as number);
  }, [data]);

  const handleChangeValue = (
    e: ChangeEvent<HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement>,
    variable: string
  ) => {
    const updatedFormParams = { ...formParams };
    if (variable === "name" || variable == "description") {
      updatedFormParams[variable] = e.target.value;
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
    if (
      variable === "total_parts" ||
      variable === "total_questions" ||
      variable === "total_score" ||
      variable === "duration"
    ) {
      updatedFormParams[variable] = parseInt(e);
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
      id: "",
      order_in_test: order_in_test + 1,
      num_of_questions: "0",
      num_of_answers: "3",
      part_type: "reading",
      has_group_question: "false",
    };
    const newTemplateParts = [...templateParts];
    newTemplateParts.push(defaultPart);
    setTemplateParts(newTemplateParts);
    setTabIndex(newTemplateParts.length - 1);
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
    const index =
      tabIndex > newTemplateParts.length
        ? newTemplateParts.length
        : tabIndex - 1;
    setTabIndex(index < 0 ? 0 : index);
  };

  useEffect(() => {
    setIsAddable(false);
    setIsDeleteable(false);
    if (templateParts && templateParts.length >= 7) {
      setIsAddable(true);
    }
    if (templateParts && templateParts.length == 0) {
      setIsDeleteable(true);
    }
  }, [templateParts]);

  const onSubmit = async () => {
    setIsLoading(true);
    const RequestFormParams: ITemplateUpdateRequest = {
      ...formParams,
      total_parts: templateParts.length,
      parts: templateParts,
    };
    setFormParams(RequestFormParams);
    if (templateParts.length == 0) {
      setIsLoading(false);
      toast({
        description: "Number of parts cannot be 0",
        status: "error",
      });
      return;
    }
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
            defaultValue={formParams.name}
          />

          <TextAreaFieldInput
            inputKey="description"
            title="Description"
            placeholder="Enter template description"
            handleChangeValue={handleChangeValue}
            errors={errors}
            register={register}
            validationError={validationError}
            defaultValue={formParams.description}
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
            value={formParams["duration"]}
            isDisabled={isDisabled}
          />

          <NumberFieldInput
            inputKey="total_questions"
            title="Total Questions"
            placeholder="Enter total questions"
            handleChangeValue={handleChangeNumberValue}
            register={register}
            errors={errors}
            validationError={validationError}
            value={formParams["total_questions"]}
            isDisabled={isDisabled}
          />

          <NumberFieldInput
            inputKey="total_score"
            title="Total score"
            placeholder="Enter total score"
            handleChangeValue={handleChangeNumberValue}
            register={register}
            errors={errors}
            validationError={validationError}
            value={formParams["total_score"]}
            isDisabled={isDisabled}
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
                  isDisabled={isAddable || isDisabled}
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
                  isDisabled={isDeleteable || isDisabled}
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
              // defaultIndex={1}
              onChange={(index) => setTabIndex(index)}
              index={tabIndex}
            >
              <TabList>
                {templateParts &&
                  templateParts.map((item, index) => {
                    return <Tab>Part {index + 1}</Tab>;
                  })}
              </TabList>
              <TabPanels>
                {templateParts &&
                  templateParts.map((item, index) => {
                    setValue(`num_of_questions_${index}`,item["num_of_questions"])
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
                          isDisabled={isDisabled}
                        />
                        <SelectFieldInput
                          inputKey={`num_of_answers_${index}`}
                          control={control}
                          errors={errors}
                          handleSelectChangeValue={handleSelectChangePartValue}
                          selectOptions={numOfAnswers}
                          title="Number of answers"
                          validationError={validationError}
                          value={item["num_of_answers"] as string}
                          isDisabled={isDisabled}
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
                          isDisabled={isDisabled}
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
                          isDisabled={isDisabled}
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

export default TemplateUpdateForm;
