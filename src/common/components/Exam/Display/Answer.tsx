import { Box, BoxProps } from "@chakra-ui/react";
import { ExamAnswer } from "models/exam";

interface IAnswer extends BoxProps {
  answer: ExamAnswer;
}

const Answer = ({ answer, ...inputProps }: IAnswer) => {
  return (
    <Box {...inputProps} backgroundColor={answer.is_right == true ? "#36b08f" : ""}>
      {answer.answer}
    </Box>
  );
};

export default Answer;
