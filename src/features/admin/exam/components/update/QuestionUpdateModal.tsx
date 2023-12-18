import {
  Box,
  Button,
  HStack,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useQueryClient } from "@tanstack/react-query";
import { useUpdateQuestion } from "api/apiHooks/examHook";
import { AxiosError } from "axios";
import AudioFieldInput from "common/components/Form/AudioFieldInput";
import ImageFieldInput from "common/components/Form/ImageFieldInput";
import { SelectFieldInput } from "common/components/Form/SelectFieldInput";
import { TextFieldInput } from "common/components/Form/TextFieldInput";
import { toast } from "common/components/StandaloneToast";
import { option } from "common/types";
import { FormParams } from "models/app";
import { ErrorResponse, ValidationErrorMessage } from "models/appConfig";
import { ExamAnswer, ExamQuestion, IUpdateQuestion } from "models/exam";
import { ChangeEvent, useState } from "react";
import { FieldErrors, UseFormRegister, useForm } from "react-hook-form";
import theme from "themes/theme";

interface IQuestionModal {
  question: ExamQuestion;
  isOpen: boolean;
  onClose: () => void;
  examId: string;
  partType: string;
}

const QuestionUpdateModal = ({
  isOpen,
  onClose,
  question,
  examId,
  partType,
}: IQuestionModal) => {
  const [validationError, setValidationError] = useState<
    ValidationErrorMessage[]
  >([]);
  const queryClient = useQueryClient();
  const rightDefaultOption = () => {
    let is_right = "";
    question.answers.forEach((answer) => {
      if (answer.is_right) {
        is_right = answer.id;
      }
    });
    return is_right;
  };
  const [formParams, setFormParams] = useState<FormParams>({
    question: question?.question as string,
    answer_1: question.answers[0].answer as string,
    answer_2: question.answers[1].answer as string,
    answer_3: question.answers[2].answer as string,
    answer_4: question.answers[3]?.answer ?? "" as string,
    is_right: rightDefaultOption(),
    attachment: question.attachment ?? ("" as string),
    audio: question.audio,
  });
  const [request, setRequest] = useState<IUpdateQuestion>();
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
  } = useUpdateQuestion(question.id, request as IUpdateQuestion);

  const handleChangeValue = (
    e: ChangeEvent<HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement>,
    variable: string
  ) => {
    const updatedFormParams = { ...formParams };
    const input = ["question", "answer_1", "answer_2", "answer_3", "answer_4"];
    if (input.includes(variable)) {
      updatedFormParams[variable as keyof FormParams] = e.target.value;
    }

    setFormParams(updatedFormParams);
  };

  const rightAnswerOption = () => {
    const option: option[] = question.answers.map((answer) => {
      return {
        value: answer.id,
        label: answer.order_in_question.toString(),
      };
    });
    return option;
  };

  const handleFileChangeValue = (
    e: ChangeEvent<HTMLInputElement>,
    variable: string
  ) => {
    const updatedFormParams = { ...formParams };
    const file = e.target.files?.[0];
    if (variable == "attachment") {
      updatedFormParams[variable] = file ?? "";
    }
    if (variable == "audio") {
      updatedFormParams[variable] = file ?? "";
    }

    setFormParams(updatedFormParams);
  };

  const deleteAttachment = () => {
    const updatedFormParams = { ...formParams };
    updatedFormParams["attachment"] = "";
    setFormParams(updatedFormParams);
  };

  const deleteAudio = () => {
    const updatedFormParams = { ...formParams };
    updatedFormParams["audio"] = "";
    setFormParams(updatedFormParams);
  };

  const handleSelectChangeValue = (value: string, variable: string) => {
    const updatedFormParams = { ...formParams };
    if (variable == "is_right") {
      updatedFormParams[variable] = value;
    }
    // updatedFormParams[variable] = value;
    setFormParams(updatedFormParams);
  };

  const onSubmit = async () => {
    const updateAnswers: ExamAnswer[] = question.answers.map((item) => {
      const is_right = item.id == formParams["is_right"] ? true : false;
      let answer = formParams[
        "answer_" + item.order_in_question.toString()
      ] as string;
      return {
        ...item,
        answer: answer,
        is_right: is_right,
        // order_in_question: item.order_in_question,
        // question_id: item.question_id
      };
    });
    const updateQuestion: IUpdateQuestion = {
      ...question,
      question: formParams["question"] as string,
      attachment: formParams["attachment"] as string | File,
      answers: updateAnswers,
      exam_id: examId,
      audio: formParams["audio"] as string | File,
    };
    setRequest(updateQuestion);
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
      description: "Update Question Successfully",
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
                  Update Question {question.order_in_test}
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
                {partType == "listening" && (
                  <ImageFieldInput
                    inputKey="attachment"
                    title="Attachment"
                    image={formParams["attachment"] as string | File}
                    imagePrefix={"exams/" + examId}
                    imageIfNull="defaultAvatar.png"
                    isShowDefault={false}
                    deleteImage={deleteAttachment}
                    handleFileChangeValue={handleFileChangeValue}
                    imageBorderRadius="none"
                    imageW="300px"
                    imageH="200px"
                  />
                )}

                {partType == "listening" && (
                  <AudioFieldInput
                    inputKey="audio"
                    audioPrefix={"exams/" + examId}
                    title="Audio"
                    audio={question.audio}
                    deleteAudio={deleteAudio}
                    handleFileChangeValue={handleFileChangeValue}
                  />
                )}

                <TextFieldInput
                  inputKey={`question`}
                  title="Question"
                  placeholder="Enter question"
                  handleChangeValue={handleChangeValue}
                  errors={errors}
                  register={register}
                  validationError={validationError}
                  defaultValue={question?.question as string}
                  isRequired={false}
                />
                <Box
                  mt={"10px"}
                  w={"100%"}
                  p={"10px"}
                  border={`1px solid ${theme.colors.borderColor}`}
                >
                  <Box>
                    <TextFieldInput
                      inputKey={`answer_1`}
                      title="Answer 1"
                      placeholder="Enter question"
                      handleChangeValue={handleChangeValue}
                      errors={errors}
                      register={register}
                      validationError={validationError}
                      defaultValue={question.answers[0].answer as string}
                    />
                    <TextFieldInput
                      inputKey={`answer_2`}
                      title="Answer 2"
                      placeholder="Enter question"
                      handleChangeValue={handleChangeValue}
                      errors={errors}
                      register={register}
                      validationError={validationError}
                      defaultValue={question.answers[1].answer as string}
                    />
                  </Box>
                  <Box>
                    <TextFieldInput
                      inputKey={`answer_3`}
                      title="Answer 3"
                      placeholder="Enter question"
                      handleChangeValue={handleChangeValue}
                      errors={errors}
                      register={register}
                      validationError={validationError}
                      defaultValue={question.answers[2].answer as string}
                    />
                    {question.answers.length == 4 ? (
                      <TextFieldInput
                        inputKey={`answer_4`}
                        title="Answer 4"
                        placeholder="Enter question"
                        handleChangeValue={handleChangeValue}
                        errors={errors}
                        register={register}
                        validationError={validationError}
                        defaultValue={question.answers[3].answer as string}
                      />
                    ) : (
                      ""
                    )}
                  </Box>
                </Box>
                <SelectFieldInput
                  inputKey="is_right"
                  control={control}
                  errors={errors}
                  handleSelectChangeValue={handleSelectChangeValue}
                  selectOptions={
                    rightAnswerOption() ?? [{ value: "", label: "" }]
                  }
                  title="Select right answer"
                  validationError={validationError}
                  value={formParams["is_right"] as string}
                />

                <Button
                  mt="14px"
                  h="50px"
                  type="submit"
                  isLoading={isLoading}
                  w="full"
                  colorScheme="gray"
                >
                  Update
                </Button>
              </VStack>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default QuestionUpdateModal;
