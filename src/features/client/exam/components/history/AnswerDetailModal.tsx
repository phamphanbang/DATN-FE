import {
  Box,
  HStack,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  Image,
  VStack,
} from "@chakra-ui/react";

import { ExamHistoryQuestion } from "models/exam";
import { getAudio, getImage } from "utils";

interface IAnswerDetailModal {
  question: ExamHistoryQuestion;
  isOpen: boolean;
  onClose: () => void;
  examId: string;
}

const AnswerDetailModal = ({
  isOpen,
  onClose,
  question,
  examId,
}: IAnswerDetailModal) => {
  const right_answer = question.answers.find((item) => item.is_right === true);
  const select_answer = question.answers.find(
    (item) => item.id === question.select_answer
  );
  const answerStyle = (answer_id: string): React.CSSProperties => {
    if (answer_id == question.select_answer && select_answer?.is_right) {
      return {
        marginRight: "10px",
        backgroundColor: "#ddfbe1",
      };
    }
    if (answer_id == question.select_answer && !select_answer?.is_right) {
      return {
        marginRight: "10px",
        backgroundColor: "#ffe8e8",
      };
    }
    return {
      marginRight: "10px",
    };
  };
  const renderAnswer = (order: string | undefined) => {
    switch (order) {
      case "1":
        return "A";
      case "2":
        return "B";
      case "3":
        return "C";
      case "4":
        return "D";
      default:
        return "Chưa trả lời";
    }
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
                  Đáp án chi tiết # {question.order_in_test}
                </Text>
              </Heading>
            </HStack>
          </ModalHeader>
          <ModalCloseButton mt="15px" mr="10px" />
          <ModalBody>
            <VStack spacing="14px" alignItems="flex-start">
              <Box maxH={"600px"} overflow={"auto"}>
                {question.attachment && (
                  <Image
                    w={"300px"}
                    h={"200px"}
                    src={getImage("exams/" + examId, question.attachment)}
                    alt={"attachment"}
                    mx={"auto"}
                    my={"10px"}
                  />
                )}
                {question.audio && (
                  <audio
                    controls
                    src={getAudio("exams/" + examId, question.audio)}
                    preload="none"
                    style={{
                      width: "80%",
                      padding: "0px 14px",
                    }}
                  ></audio>
                )}
                {question.question && <Text>{question.question}</Text>}
                {question.answers.map((answer) => {
                  return (
                    <label
                      style={{
                        display: "flex",
                        alignItems: "center",
                        width: "50%",
                        gap:'10px'
                      }}
                      
                    >
                      <input
                        type="radio"
                        id={"answers_" + answer.id}
                        value={answer.id}
                        disabled={true}
                        checked={answer.id == question.select_answer}
                      />
                      <Text style={answerStyle(answer.id)}>{answer.answer}</Text>
                    </label>
                  );
                })}
                {!select_answer?.is_right && (
                  <Box fontWeight={"500"} color={"#3cb46e"}>
                    Đáp án đúng :{" "}
                    {renderAnswer(right_answer?.order_in_question.toString())}
                  </Box>
                )}
              </Box>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AnswerDetailModal;
