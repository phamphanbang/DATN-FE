import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
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
import { ErrorMessage } from "@hookform/error-message";
import { useQueryClient } from "@tanstack/react-query";
import { useUpdateGroup } from "api/apiHooks/examHook";
import { AxiosError } from "axios";
import { ErrorDisplay } from "common/components/ErrorDisplay";
import AudioFieldInput from "common/components/Form/AudioFieldInput";
import ImageFieldInput from "common/components/Form/ImageFieldInput";
import { SelectFieldInput } from "common/components/Form/SelectFieldInput";
import { TextFieldInput } from "common/components/Form/TextFieldInput";
import { toast } from "common/components/StandaloneToast";
import TinyMCE from "common/components/TinyMCE/TinyMCE";
import { FormParams } from "models/app";
import { ErrorResponse, ValidationErrorMessage } from "models/appConfig";
import { ExamGroup, IUpdateGroup } from "models/exam";
import { ChangeEvent, useState } from "react";
import { useForm } from "react-hook-form";

interface IGroupModal {
  group: ExamGroup;
  isOpen: boolean;
  onClose: () => void;
  examId: string;
  partType: string;
}

const GroupUpdateModal = ({
  isOpen,
  onClose,
  group,
  examId,
  partType,
}: IGroupModal) => {
  const [validationError, setValidationError] = useState<
    ValidationErrorMessage[]
  >([]);
  const queryClient = useQueryClient();
  const [formParams, setFormParams] = useState<FormParams>({
    question: group?.question as string,
    attachment: group.attachment ?? ("" as string),
    audio: group.audio ?? ("" as string),
  });
  const [request, setRequest] = useState<IUpdateGroup>();
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
  } = useUpdateGroup(group.id, request as IUpdateGroup);

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

  const onSubmit = async () => {
    const updateGroup: IUpdateGroup = {
      question: formParams["question"] as string,
      attachment: formParams["attachment"] as string | File,
      audio: formParams["audio"] as string | File,
      exam_id: examId,
    };
    setRequest(updateGroup);
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
      description: "Update Group Successfully",
      status: "success",
    });
    onClose();
  };

  const handleEditorChange = (content: any, editor: any) => {
    const newFormParams = { ...formParams };
    newFormParams["question"] = content;
    setFormParams(newFormParams);
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
                  Update Group {group.from_question} - {group.to_question}
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
                    audio={group.audio}
                    deleteAudio={deleteAudio}
                    handleFileChangeValue={handleFileChangeValue}
                  />
                )}

                <FormControl key={"question"}>
                  <FormLabel fontSize={16} my={1} fontWeight="normal">
                    Question
                    {/* <FormHelperText my={1} style={{ color: "red" }} as="span">
                      {" "}
                      *
                    </FormHelperText> */}
                  </FormLabel>
                  <ErrorMessage
                    errors={errors}
                    name={"question"}
                    render={({ message }) => <ErrorDisplay message={message} />}
                  />
                  <TinyMCE
                    initValue={formParams["question"] as string}
                    handleEditorChange={handleEditorChange}
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

export default GroupUpdateModal;
