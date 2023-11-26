import { Box, BoxProps, Button } from "@chakra-ui/react";
import Question from "common/components/Exam/Display/Question";
import { ExamQuestion } from "models/exam";
import { useState } from "react";
import theme from "themes/theme";

interface IQuestion extends BoxProps {
  question: ExamQuestion;
  onOpenQuestionUpdate: (question:ExamQuestion) => void;
}

const QuestionDetail = ({ question, onOpenQuestionUpdate, ...inputProps }: IQuestion) => {
  const [style, setStyle] = useState({ display: "none" });
  return (
    <Box
      position={"relative"}
      onMouseEnter={() => {
        setStyle({ display: "block" });
      }}
      onMouseLeave={() => {
        setStyle({ display: "none" });
      }}
      {...inputProps}
      px={'10px'}
      border={`1px solid ${theme.colors.borderColor}`}
      borderRadius={'5px'}
      my={'10px'}
      _hover={{
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)"
      }}
    >
      <Question question={question} />
      <Button
        w="fit-content"
        colorScheme="gray"
        position={"absolute"}
        top={"2"}
        right={"2"}
        style={style}
        onClick={() => onOpenQuestionUpdate(question)}
      >
        Update Question {question.order_in_test}
      </Button>
    </Box>
  );
};

export default QuestionDetail;
