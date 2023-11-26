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
  Center,
  Spinner,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
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
import {
  useCreateNewTemplate,
  useGetTemplateDetail,
} from "api/apiHooks/templateHook";
import { FormParams } from "models/app";
import { ITemplatePartCreateRequest } from "models/template";
import { FaMinus, FaPlus } from "react-icons/fa";
import theme from "themes/theme";
import { capitalizeFirstLetter } from "utils";
import {
  ICreateExamGroupRequest,
  ICreateExamPartRequest,
  ICreateExamRequest,
  IRenderPart,
} from "models/exam";
import CreateGroupModal from "./CreateGroupModal";
import { useCreateNewExam } from "api/apiHooks/examHook";

interface IExamCreateForm {
  templateId: string;
}

const ExamCreateForm = ({ templateId }: IExamCreateForm) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { data: template, isLoading: isTemplateLoading } =
    useGetTemplateDetail(templateId);
  const [hasTemplate, setHasTemplate] = useState<boolean>(true);
  const [validationError, setValidationError] = useState<
    ValidationErrorMessage[]
  >([]);
  const [formParams, setFormParams] = useState<FormParams>({
    name: "",
    template_id: templateId,
    parts: [],
  });
  const [renderPart, setRenderPart] = useState<IRenderPart[]>([]);
  const [isAddable, setIsAddable] = useState<boolean>(true);
  const [isDeleteable, setIsDeleteable] = useState<boolean>(false);
  const { mutateAsync: createMutate } = useCreateNewExam();
  const queryClient = useQueryClient();
  const [tabIndex, setTabIndex] = useState<number>(0);
  const [isOpenCreate, setIsOpenCreate] = useState(false);

  const {
    register,
    unregister,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormParams>({
    criteriaMode: "all",
  });

  useEffect(() => {
    if (templateId && template) {
      let currentIndex = 1;
      const renderPartArray: IRenderPart[] = template.parts.map((item) => {
        const from = currentIndex;
        const to = currentIndex + item.num_of_questions - 1;
        currentIndex = currentIndex + item.num_of_questions;
        return {
          template_part_id: item.id,
          num_of_questions: item.num_of_questions,
          num_of_answers: item.num_of_answers,
          order_in_test: item.order_in_test,
          part_type: item.part_type,
          has_group_question: item.has_group_question,
          from_question: from,
          to_question: to,
          groups: [],
        };
      });
      setRenderPart(renderPartArray);
      setHasTemplate(true);
    } else {
      setHasTemplate(false);
    }
  }, [templateId, isTemplateLoading]);

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

  const currentQuestionInPart = (index: number) => {
    let currentNumOfQuestion =
      renderPart[index].has_group_question == "1"
        ? 0
        : renderPart[index].num_of_questions;
    if (renderPart[index]) {
      renderPart[index].groups?.forEach((item) => {
        const num = isNaN(item.num_of_questions) ? 0 : item.num_of_questions;
        currentNumOfQuestion += num;
      });
    }
    return currentNumOfQuestion;
  };

  const validationNumOfQuestion = (index: number, add_questions: number) => {
    if (
      currentQuestionInPart(index) + add_questions <=
      renderPart[index].num_of_questions
    ) {
      return true;
    }
    toast({
      description: `Number of questions created bigger than number of questions in part ${
        index + 1
      }`,
      status: "error",
    });
    return false;
  };

  const handleChangeGroupNumberValue = (
    e: string,
    v: string,
    index: number
  ) => {
    const updatePart = [...renderPart];
    var splitArray = v.split("_");
    const groupIndex = parseInt(splitArray[2]);
    if (splitArray[0] === "numOfQuestions") {
      updatePart[tabIndex].groups[groupIndex]["num_of_questions"] = parseInt(e);
    }
    setRenderPart(updatePart);
    if (!validationNumOfQuestion(tabIndex, 0)) return;
  };

  const addGroup = (num_of_groups: number, num_of_questions: number) => {
    const order_in_part = renderPart[tabIndex].groups?.length ?? 0;
    if (!validationNumOfQuestion(tabIndex, num_of_groups * num_of_questions))
      return;
    const newGroup: ICreateExamGroupRequest[] = [];
    for (let i = 0; i < num_of_groups; i++) {
      const defaultGroup = {
        order_in_part: order_in_part + i + 1,
        num_of_questions: num_of_questions,
      };
      newGroup.push(defaultGroup);
    }
    const newRenderPart = [...renderPart];
    newRenderPart[tabIndex].groups =
      newRenderPart[tabIndex].groups?.concat(newGroup);
    setRenderPart(newRenderPart);
  };

  const removeGroup = (deleteIndex: number) => {
    const deleteExamGroup = [...renderPart[tabIndex].groups];
    deleteExamGroup.forEach((item, index) => {
      unregister(`numOfQuestions_${tabIndex}_${index}`);
    });
    deleteExamGroup.splice(deleteIndex, 1);
    const newExamParts = deleteExamGroup.map((item, index) => {
      return {
        ...item,
        order_in_part: index + 1,
      };
    });
    const newRenderPart = [...renderPart];
    newRenderPart[tabIndex].groups = newExamParts;
    setRenderPart(newRenderPart);
  };

  useEffect(() => {
    setIsAddable(true);
    setIsDeleteable(false);
    if (renderPart[tabIndex]) {
      if (
        currentQuestionInPart(tabIndex) < renderPart[tabIndex].num_of_questions
      ) {
        setIsAddable(false);
      }
    }
    // if (templateParts.length == 0) {
    //   setIsDeleteable(true);
    // }
  }, [renderPart, tabIndex]);

  const onSubmit = async () => {
    setIsLoading(true);
    for (let i = 0; i < renderPart.length; i++) {
      if (currentQuestionInPart(i) == renderPart[i].num_of_questions) continue;
      toast({
        description: `Number of questions created not equal number of questions in part ${
          i + 1
        }`,
        status: "error",
      });
      setIsLoading(false);
      return false;
    }
    const requestPart: ICreateExamPartRequest[] = renderPart.map((item) => {
      const res: ICreateExamPartRequest = {
        order_in_test: item.order_in_test,
        template_part_id: item.template_part_id,
      };
      if ("groups" in item) {
        res.groups = [...item.groups];
      }
      return res;
    });
    const RequestFormParams: ICreateExamRequest = {
      name: formParams["name"] as string,
      template_id: templateId,
      parts: [...requestPart],
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
    navigate("/admin/exams");
  };

  return (
    <>
      {isTemplateLoading ? (
        <Center h="200px">
          <Spinner mx="auto" speed="0.65s" thickness="3px" size="xl" />
        </Center>
      ) : !hasTemplate ? (
        <Box w={"100%"} p={"10"} fontSize={"18px"} fontWeight={"600"}>
          The template for this exam is not available
        </Box>
      ) : (
        <form className={styles.container} onSubmit={handleSubmit(onSubmit)}>
          <VStack spacing="14px" alignItems="flex-start">
            <Box w={"100%"} my={"10px"}>
              <Box>Exam detail</Box>
              <Box display={"flex"}>
                <Box>
                  Total parts: <b>{template?.total_parts}</b>
                </Box>
                <Box ml={'10px'}>
                  Total questions : <b>{template?.total_questions}</b>
                </Box>
                <Box ml={'10px'}>
                  {`Duration (min) : `} <b>{template?.duration}</b>
                </Box>
              </Box>
            </Box>
            <TextFieldInput
              inputKey="name"
              title="Name"
              placeholder="Enter exam name"
              handleChangeValue={handleChangeValue}
              errors={errors}
              register={register}
              validationError={validationError}
            />

            <Box
              w={"100%"}
              p={"10px"}
              border={`1px solid ${theme.colors.borderColor}`}
            >
              <FormLabel
                fontSize={15}
                my={3}
                fontWeight="medium"
                display="flex"
                alignItems="center"
                justifyContent="space-between"
              >
                Exam Part
              </FormLabel>
              <Tabs
                variant="soft-rounded"
                colorScheme="green"
                onChange={(index) => setTabIndex(index)}
              >
                <TabList>
                  {renderPart.map((item, index) => {
                    return <Tab>Part {item.order_in_test}</Tab>;
                  })}
                </TabList>
                <TabPanels>
                  {renderPart.map((item, partIndex) => {
                    return item.has_group_question == "0" ? (
                      <TabPanel>
                        <p>
                          This is a{" "}
                          <b>{capitalizeFirstLetter(item.part_type)}</b> part
                        </p>
                        <p>
                          This part has total <b>{item.num_of_questions}</b>{" "}
                          questions
                        </p>
                        <p>
                          Start from question <b>{item.from_question}</b> to{" "}
                          <b>{item.to_question}</b>
                        </p>
                        <p>
                          Each questions has <b>{item.num_of_answers}</b>{" "}
                          answers
                        </p>
                        <p>This part does not have group question</p>
                      </TabPanel>
                    ) : (
                      <TabPanel>
                        <p>
                          This is a{" "}
                          <b>{capitalizeFirstLetter(item.part_type)}</b> part
                        </p>
                        <p>
                          This part has total <b>{item.num_of_questions}</b>{" "}
                          questions
                        </p>
                        <p>
                          Start from question <b>{item.from_question}</b> to{" "}
                          <b>{item.to_question}</b>
                        </p>
                        <p>
                          Each questions has <b>{item.num_of_answers}</b>{" "}
                          answers
                        </p>
                        <p>This part has group question</p>
                        <br />
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
                            Group questions
                          </FormLabel>
                          <Box>
                            <Button
                              type="button"
                              onClick={() => setIsOpenCreate(true)}
                              w="fit-content"
                              colorScheme="green"
                              isDisabled={isAddable}
                              leftIcon={<FaPlus />}
                            >
                              Add group
                            </Button>
                            {/* <Button
                              type="button"
                              colorScheme="red"
                              w="fit-content"
                              onClick={() => {
                                removeGroup(tabIndex);
                              }}
                              isDisabled={isDeleteable}
                              leftIcon={<FaMinus />}
                              ml="10px"
                            >
                              Remove group
                            </Button> */}
                          </Box>
                        </Box>

                        <Accordion allowToggle>
                          {item.groups?.map((groupItem, groupIndex) => {
                            return (
                              <AccordionItem>
                                <h2>
                                  <AccordionButton>
                                    <Box as="span" flex="1" textAlign="left">
                                      Group <b>{groupIndex + 1}</b> has{" "}
                                      <b>
                                        {isNaN(groupItem.num_of_questions)
                                          ? ""
                                          : groupItem.num_of_questions}
                                      </b>{" "}
                                      questions
                                    </Box>
                                    <AccordionIcon />
                                  </AccordionButton>
                                </h2>
                                <AccordionPanel
                                  pb={4}
                                  display={"flex"}
                                  flexDirection={"column"}
                                  alignItems={"flex-end"}
                                >
                                  <NumberFieldInput
                                    inputKey={`numOfQuestions_${partIndex}_${groupIndex}`}
                                    title="Number of questions"
                                    placeholder="Enter number of questions"
                                    handleChangeValue={
                                      handleChangeGroupNumberValue
                                    }
                                    register={register}
                                    errors={errors}
                                    validationError={validationError}
                                    index={groupIndex}
                                    value={groupItem.num_of_questions as number}
                                  />
                                  <Button
                                    mt={"10px"}
                                    type="button"
                                    colorScheme="red"
                                    w="fit-content"
                                    onClick={() => {
                                      removeGroup(groupIndex);
                                    }}
                                    isDisabled={isDeleteable}
                                    leftIcon={<FaMinus />}
                                  >
                                    Remove group
                                  </Button>
                                </AccordionPanel>
                              </AccordionItem>
                            );
                          })}
                        </Accordion>
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
      )}
      {isOpenCreate && (
        <CreateGroupModal
          isOpen={isOpenCreate}
          addGroup={addGroup}
          onClose={() => setIsOpenCreate(false)}
        />
      )}
    </>
  );
};

export default ExamCreateForm;
