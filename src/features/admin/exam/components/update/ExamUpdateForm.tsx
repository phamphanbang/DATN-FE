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
import { FormParams } from "models/app";
import { ITemplatePartCreateRequest } from "models/template";
import { FaMinus, FaPlus } from "react-icons/fa";
import theme from "themes/theme";
import { getItem, setItem } from "utils";
import { ExamGroup, ExamQuestion, IUpdateExam } from "models/exam";
import { useGetExamDetail, useUpdateExam } from "api/apiHooks/examHook";
import { SelectFieldInput } from "common/components/Form/SelectFieldInput";
import { examStatus } from "common/constants";
import QuestionDetail from "./component/QuestionDetail";
import GroupDetail from "./component/GroupDetail";
import QuestionUpdateModal from "./QuestionUpdateModal";
import GroupUpdateModal from "./GroupUpdateModal";

interface IExamUpdateForm {
  examId: string;
}

const ExamUpdateForm = ({ examId }: IExamUpdateForm) => {
  const navigate = useNavigate();
  const { data: exam, isLoading: isExamLoading } = useGetExamDetail(examId);
  const [validationError, setValidationError] = useState<
    ValidationErrorMessage[]
  >([]);
  const [formParams, setFormParams] = useState<FormParams>({
    name: exam?.name as string,
    status: exam?.status as string
  });
  const queryClient = useQueryClient();
  const [tabIndex, setTabIndex] = useState<number>(0);

  const [isOpenQuestionUpdate, setIsOpenQuestionUpdate] = useState(false);
  const [questionUpdate, setQuestionUpdate] = useState<ExamQuestion>();

  const [isOpenGroupUpdate, setIsOpenGroupUpdate] = useState(false);
  const [groupUpdate, setGroupUpdate] = useState<ExamGroup>();

  const [request, setRequest] = useState<IUpdateExam>();

  useEffect(() => {
    const index = parseInt(getItem("exam_part_index") ?? "0");
    const question = getItem("exam_scroll_to") ?? "";
    setTabIndex(index);
    if (question) {
      const el = document.querySelector("#" + question);
      if (el) el.scrollIntoView();
    }
  }, [isExamLoading]);

  useEffect(() => {
    return () => {
      setItem("exam_part_index", "0");
      setItem("exam_scroll_to", "");
    };
  }, []);

  const {
    register,
    unregister,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormParams>({
    criteriaMode: "all",
  });

  const {
    mutateAsync: mutate,
    isLoading,
    error,
  } = useUpdateExam(examId, request as IUpdateExam);

  const handleChangeValue = (
    e: ChangeEvent<HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement>,
    variable: string
  ) => {
    const updatedFormParams = { ...formParams };
    const input = ["name"];
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

  const openQuestionUpdate = (question: ExamQuestion) => {
    setItem("exam_part_index", tabIndex.toString());
    setItem("exam_scroll_to", `question_${question.id}`);
    setQuestionUpdate(question);
    setIsOpenQuestionUpdate(true);
  };

  const openGroupUpdate = (group: ExamGroup) => {
    setItem("exam_part_index", tabIndex.toString());
    setItem("exam_scroll_to", `group_${group.id}`);
    setGroupUpdate(group);
    setIsOpenGroupUpdate(true);
  };

  const onSubmit = async () => {
    const updateExam: IUpdateExam = {
      name: formParams["name"] as string,
      status: formParams['status'] as string
    };
    setRequest(updateExam);
    try {
      await mutate();
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
      description: "Update Exam Successfully",
      status: "success",
    });
  };

  return (
    <>
      {isExamLoading ? (
        <Center h="200px">
          <Spinner mx="auto" speed="0.65s" thickness="3px" size="xl" />
        </Center>
      ) : !exam ? (
        <Box w={"100%"} p={"10"} fontSize={"18px"} fontWeight={"600"}>
          The exam is not available
        </Box>
      ) : (
        <form className={styles.container} onSubmit={handleSubmit(onSubmit)}>
          <VStack spacing="14px" alignItems="flex-start">
            <TextFieldInput
              inputKey="name"
              title="Name"
              placeholder="Enter exam name"
              handleChangeValue={handleChangeValue}
              errors={errors}
              register={register}
              validationError={validationError}
              defaultValue={exam?.name as string}
            />

            <SelectFieldInput
              inputKey="status"
              control={control}
              errors={errors}
              handleSelectChangeValue={handleSelectChangeValue}
              selectOptions={examStatus ?? [{ value: "", label: "" }]}
              title="Select your exam status"
              validationError={validationError}
              value={exam?.status as string}
            />

            <Button
              mt="14px"
              h="50px"
              type="submit"
              isLoading={isLoading}
              w="full"
              colorScheme="gray"
            >
              Update Exam
            </Button>

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
              onChange={(index) => {
                setTabIndex(index);
                setItem("exam_part_index", tabIndex.toString());
              }}
              index={tabIndex}
              w={"100%"}
            >
              <TabList>
                {exam?.parts.map((item) => {
                  return <Tab>Part {item.order_in_test}</Tab>;
                })}
              </TabList>
              <TabPanels w={"100%"}>
                {exam?.parts.map((item) => {
                  return !("groups" in item) ? (
                    <TabPanel w={"100%"}>
                      <Accordion allowToggle>
                        {item.questions?.map((question) => {
                          return (
                            // <AccordionItem>
                            //   <h2>
                            //     <AccordionButton>
                            //       <Box as="span" flex="1" textAlign="left">
                            //         Question <b>{question.order_in_test}</b>
                            //       </Box>
                            //       <AccordionIcon />
                            //     </AccordionButton>
                            //   </h2>
                            //   <AccordionPanel
                            //     pb={4}
                            //     display={"flex"}
                            //     flexDirection={"column"}
                            //     alignItems={"flex-end"}
                            //     w={'100%'}
                            //   >
                            //     <Box>
                            //       <Box></Box>
                            //     </Box>
                            //   </AccordionPanel>
                            // </AccordionItem>
                            <QuestionDetail
                              onOpenQuestionUpdate={openQuestionUpdate}
                              question={question}
                              id={`question_${question.id}`}
                              itemRef={`question_${question.id}`}
                            />
                          );
                        })}
                      </Accordion>
                    </TabPanel>
                  ) : (
                    <TabPanel>
                      {/* <Accordion allowToggle>
                        {item.groups?.map((groupItem) => {
                          return (
                            <AccordionItem>
                              <h2>
                                <AccordionButton>
                                  <Box as="span" flex="1" textAlign="left">
                                    Question <b>{groupItem.from_question}</b> to
                                    Question <b>{groupItem.to_question}</b>
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
                                <Group
                                  group={groupItem}
                                  handleChangeValue={handleChangeValue}
                                  handleEditorChange={handleEditorChange}
                                  register={register}
                                  validationError={validationError}
                                  errors={errors}
                                />
                              </AccordionPanel>
                            </AccordionItem>
                          );
                        })}
                      </Accordion> */}
                      {item.groups?.map((group) => {
                        return (
                          <GroupDetail
                            onOpenQuestionUpdate={openQuestionUpdate}
                            onOpenGroupUpdate={openGroupUpdate}
                            id={`group_${group.id}`}
                            group={group}
                          />
                        );
                      })}
                    </TabPanel>
                  );
                })}
              </TabPanels>
            </Tabs>
          </VStack>
        </form>
      )}
      {isOpenQuestionUpdate && (
        <QuestionUpdateModal
          isOpen={isOpenQuestionUpdate}
          question={questionUpdate as ExamQuestion}
          onClose={() => setIsOpenQuestionUpdate(false)}
        />
      )}
      {isOpenGroupUpdate && (
        <GroupUpdateModal
          isOpen={isOpenGroupUpdate}
          group={groupUpdate as ExamGroup}
          onClose={() => setIsOpenGroupUpdate(false)}
        />
      )}
    </>
  );
};

export default ExamUpdateForm;
