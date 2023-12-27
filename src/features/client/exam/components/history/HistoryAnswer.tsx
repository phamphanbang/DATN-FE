import { Box, Button, Flex, Text } from "@chakra-ui/react";
import {
  ExamHistoryDetail,
  ExamHistoryGroup,
  ExamHistoryQuestion,
} from "models/exam";
import { ReactNode, useState } from "react";
import { FaTimes, FaMinus, FaCheck } from "react-icons/fa";
import AnswerDetailModal from "./AnswerDetailModal";
import { useNavigate } from "react-router-dom";

interface IHistoryAnswer {
  history: ExamHistoryDetail;
}

const HistoryAnswer = ({ history }: IHistoryAnswer) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectQuestion, setSelectQuestion] = useState<ExamHistoryQuestion>();
  const renderAnswer = (order: string) => {
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

  const renderIcon = (is_right: boolean | undefined, select_answer: string) => {
    if (!is_right && select_answer) {
      return (
        <Box color={"#e43a45"}>
          <FaTimes />
        </Box>
      );
    }
    if (!is_right && !select_answer) {
      return (
        <Box color={"#1a1a1a"}>
          <FaMinus />
        </Box>
      );
    }
    return (
      <Box color={"#3cb46e"}>
        <FaCheck />
      </Box>
    );
  };

  const renderQuestion = (questions: ExamHistoryQuestion[]): ReactNode => {
    return (
      <Box>
        {questions.map((item) => {
          const right_answer = item.answers.find((a) => a.is_right === true);
          const select_answer = item.answers.find(
            (a) => a.id === item.select_answer
          );
          return (
            <Flex
              fontWeight={"500"}
              w={"100%"}
              alignItems={"center"}
              gap={"10px"}
              my={"20px"}
            >
              <Text w={"25px"}>{item.order_in_test}</Text>
              <Text>
                {renderAnswer(
                  right_answer?.order_in_question.toString() as string
                )}{" "}
                :
              </Text>
              <Text
                style={
                  !select_answer?.is_right && item.select_answer
                    ? {
                        textDecoration: "line-through",
                      }
                    : {}
                }
              >
                {renderAnswer(
                  select_answer?.order_in_question.toString() ?? ("0" as string)
                )}
              </Text>
              {renderIcon(select_answer?.is_right, item.select_answer)}
              <Button
                border={"1px solid #2b6cb0"}
                backgroundColor={"white"}
                color={"#2b6cb0"}
                _hover={{
                  border: "1px solid #2b6cb0",
                  backgroundColor: "#2b6cb0",
                  color: "white",
                }}
                size="xs"
                onClick={() => {
                  setSelectQuestion(item);
                  setIsOpen(true);
                }}
              >
                Chi tiết
              </Button>
            </Flex>
          );
        })}
      </Box>
    );
  };

  const renderGroup = (groups: ExamHistoryGroup[]) => {
    const questions: ExamHistoryQuestion[] = [];
    groups.forEach((group) => {
      group.questions.forEach((question) => {
        questions.push(question);
      });
    });
    const halfwayPoint = Math.ceil(questions.length / 2);
    const right = questions.slice(0, halfwayPoint);
    const left = questions.slice(halfwayPoint);
    return (
      <Flex pl={"10px"}>
        <Box w={"50%"}>{renderQuestion(right)}</Box>
        <Box w={"50%"}>{renderQuestion(left)}</Box>
      </Flex>
    );
  };

  const renderQuestionPart = (questions: ExamHistoryQuestion[]): ReactNode => {
    const halfwayPoint = Math.ceil(questions.length / 2);
    const right = questions.slice(0, halfwayPoint);
    const left = questions.slice(halfwayPoint);
    return (
      <Flex pl={"10px"}>
        <Box w={"50%"}>{renderQuestion(right)}</Box>
        <Box w={"50%"}>{renderQuestion(left)}</Box>
      </Flex>
    );
  };

  return (
    <Box>
      <Flex alignItems={'center'} gap={'20px'} mb={'20px'}>
        <Text fontWeight={"600"} fontSize={"20px"}>
          Đáp án
        </Text>
        <Button
          border={"1px solid #2b6cb0"}
          backgroundColor={"white"}
          color={"#2b6cb0"}
          _hover={{
            border: "1px solid #2b6cb0",
            backgroundColor: "#2b6cb0",
            color: "white",
          }}
          onClick={() =>
            navigate(
              "/exams/" +
                history.exam_id +
                "/history/" +
                history.history_id +
                "/detail"
            )
          }
        >
          Xem đáp án chi tiết
        </Button>
      </Flex>

      {history.parts.map((part) => {
        return (
          <Box>
            <Text fontWeight={"600"}>Part {part.order_in_test}</Text>
            {part.groups && renderGroup(part.groups)}
            {part.questions && renderQuestionPart(part.questions)}
          </Box>
        );
      })}
      {isOpen && (
        <AnswerDetailModal
          examId={history.exam_id}
          question={selectQuestion as ExamHistoryQuestion}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
        />
      )}
    </Box>
  );
};

export default HistoryAnswer;
