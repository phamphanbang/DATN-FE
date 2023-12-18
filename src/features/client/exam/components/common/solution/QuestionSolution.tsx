import { Box, BoxProps, Text, Image } from "@chakra-ui/react";

import { ExamQuestion } from "models/exam";
import { getAudio, getImage } from "utils";
import AnswerSolution from "./AnswerSolution";

interface IQuestion extends BoxProps {
  question: ExamQuestion;
  examId: string;
}

const QuestionSolution = ({ question, examId, ...inputProps }: IQuestion) => {
  const attachment = () => {
    return getImage("exams/" + examId, question.attachment);
  };

  const audio = () => {
    return getAudio("exams/" + examId, question.audio);
  };

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

  const right_question = question.answers.find((i) => i.is_right === true);

  return (
    <Box my={"10px"} p={"10px"} {...inputProps}>
      {question.attachment && (
        <Box>
          <Image
            // w={"300px"}
            // h={"200px"}
            src={attachment()}
            alt={"attachment"}
            // mx={"auto"}
            my={"10px"}
            borderRadius={"none"}
          />
        </Box>
      )}
      {question.audio && (
        <audio
          controls
          src={audio()}
          preload="none"
          style={{
            width: "100%",
            padding: "0px 14px",
          }}
        ></audio>
      )}
      <Box>
        <b style={{ marginRight: "10px" }}>{question.order_in_test}.</b>
        {question.question}
      </Box>
      <fieldset
        style={{
          marginLeft: "10px",
        }}
      >
        {question.answers.map((answer) => {
          return <AnswerSolution questionId={question.id} answer={answer} />;
        })}
        {right_question && (
          <Text color={"#3cb46e"} fontWeight={"500"} mt={"10px"}>
            Đáp án đúng :{" "}
            {renderAnswer(right_question?.order_in_question.toString())}
          </Text>
        )}
      </fieldset>
    </Box>
  );
};

export default QuestionSolution;
