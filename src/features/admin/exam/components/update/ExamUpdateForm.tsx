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
import { getItem, setItem } from "utils";
import { ExamGroup, ExamQuestion, IUpdateExam } from "models/exam";
import { useGetExamDetail, useUpdateExam } from "api/apiHooks/examHook";
import { SelectFieldInput } from "common/components/Form/SelectFieldInput";
import { examStatus, examType } from "common/constants";
import QuestionDetail from "./component/QuestionDetail";
import GroupDetail from "./component/GroupDetail";
import QuestionUpdateModal from "./QuestionUpdateModal";
import GroupUpdateModal from "./GroupUpdateModal";
import { uploadFile } from "api/apiHooks/S3Hook";
import AudioFieldInputS3 from "common/components/Form/AudioFieldInputS3";

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
    name: "",
    status: "",
    audio: "",
    type: "",
  });
  const queryClient = useQueryClient();
  const [tabIndex, setTabIndex] = useState<number>(0);
  const [isS3Upload, setIsS3Upload] = useState<boolean>(false);

  const [isOpenQuestionUpdate, setIsOpenQuestionUpdate] = useState(false);
  const [questionUpdate, setQuestionUpdate] = useState<ExamQuestion>();

  const [isOpenGroupUpdate, setIsOpenGroupUpdate] = useState(false);
  const [groupUpdate, setGroupUpdate] = useState<ExamGroup>();

  const [request, setRequest] = useState<IUpdateExam>();

  useEffect(() => {
    const index = parseInt(getItem("exam_part_index") ?? "0");
    const question = getItem("exam_scroll_to") ?? "";
    setFormParams({
      name: exam?.name as string,
      status: exam?.status as string,
      type: exam?.type as string,
      audio: exam?.audio ?? ("" as string),
    });
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
    data,
  } = useUpdateExam(examId, request as IUpdateExam);

  const handleChangeValue = (
    e: ChangeEvent<HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement>,
    variable: string
  ) => {
    const updatedFormParams = { ...formParams };
    // const input = ["name"];
    // if (input.includes(variable)) {
    //   updatedFormParams[variable as keyof FormParams] = e.target.value;
    // }
    updatedFormParams.name = e.target.value;
    setFormParams(updatedFormParams);
  };

  const handleSelectChangeValue = (value: string, variable: string) => {
    const updatedFormParams = { ...formParams };
    if (variable == "status" || variable == "type") {
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
    if (variable == "audio") {
      updatedFormParams[variable] = file ?? "";
    }

    setFormParams(updatedFormParams);
  };

  const deleteAudio = () => {
    const updatedFormParams = { ...formParams };
    updatedFormParams["audio"] = "";
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

  const updateFileToS3 = async () => {
    const isFile = typeof formParams["audio"] !== "string";
    if (isFile) {
      setIsS3Upload(true);
      const audioUrl = await uploadFile(
        formParams["audio"] as File,
        "exam_" + examId + "_audio"
      );
      return audioUrl;
    }
    return formParams["audio"] as string;
  };

  const onSubmit = async () => {
    try {
      const url = await updateFileToS3();
      setIsS3Upload(false);
      const updateExam: IUpdateExam = {
        name: formParams["name"] as string,
        status: formParams["status"] as string,
        type: formParams["type"] as string,
        audio: url as string,
      };
      await setRequest(updateExam);
      await mutate(updateExam);
    } catch (error) {
      setIsS3Upload(false);
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

  const partType = () => {
    return exam?.parts[tabIndex].part_type;
  }

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
              value={formParams["status"] as string}
            />

            <SelectFieldInput
              inputKey="type"
              control={control}
              errors={errors}
              handleSelectChangeValue={handleSelectChangeValue}
              selectOptions={examType ?? [{ value: "", label: "" }]}
              title="Select your exam type"
              validationError={validationError}
              value={formParams["type"] as string}
            />

            {/* <AudioFieldInput
              inputKey="audio"
              audioPrefix={"exams/" + examId}
              title="Audio"
              audio={formParams["audio"] as string}
              deleteAudio={deleteAudio}
              handleFileChangeValue={handleFileChangeValue}
            /> */}

            <AudioFieldInputS3
              inputKey="audio"
              audioPrefix={"exams/" + examId}
              title="Audio"
              audio={formParams["audio"] as string}
              deleteAudio={deleteAudio}
              handleFileChangeValue={handleFileChangeValue}
            />

            <Button
              mt="14px"
              h="50px"
              type="submit"
              isLoading={isLoading || isS3Upload}
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
                            <QuestionDetail
                              onOpenQuestionUpdate={openQuestionUpdate}
                              question={question}
                              id={`question_${question.id}`}
                              itemRef={`question_${question.id}`}
                              examId={examId}
                            />
                          );
                        })}
                      </Accordion>
                    </TabPanel>
                  ) : (
                    <TabPanel>
                      {item.groups?.map((group) => {
                        return (
                          <GroupDetail
                            onOpenQuestionUpdate={openQuestionUpdate}
                            onOpenGroupUpdate={openGroupUpdate}
                            id={`group_${group.id}`}
                            group={group}
                            examId={examId}
                            partType={item.part_type}
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
          examId={examId}
          partType={partType() ?? "listening"}
        />
      )}
      {isOpenGroupUpdate && (
        <GroupUpdateModal
          isOpen={isOpenGroupUpdate}
          group={groupUpdate as ExamGroup}
          onClose={() => setIsOpenGroupUpdate(false)}
          examId={examId}
          partType={partType() ?? "listening"}
        />
      )}
    </>
  );
};

export default ExamUpdateForm;
