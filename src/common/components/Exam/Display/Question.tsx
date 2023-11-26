import { Box, BoxProps } from "@chakra-ui/react";
import { ExamQuestion } from "models/exam";
import Answer from "./Answer";

interface IQuestion extends BoxProps {
  question: ExamQuestion;
}

const Question = ({ question, ...inputProps }: IQuestion) => {
  return (
    <Box my={"10px"} {...inputProps}>
      <Box>
        <b style={{marginRight: '10px'}}>{question.order_in_test}.</b>
        {question.question}
      </Box>
      <Box display={"flex"} my={"5px"}>
        <Answer answer={question.answers[0]} w={"50%"} px={"5px"} />
        <Answer answer={question.answers[1]} w={"50%"} px={"5px"} />
      </Box>
      <Box display={"flex"} my={"5px"}>
        <Answer answer={question.answers[2]} w={"50%"} px={"5px"} />
        {question.answers.length == 4 ? (
          <Answer answer={question.answers[3]} w={"50%"} px={"5px"} />
        ) : (
          ""
        )}
      </Box>
    </Box>
  );
};

export default Question;
