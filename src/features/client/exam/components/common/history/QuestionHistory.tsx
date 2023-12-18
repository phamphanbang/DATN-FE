import { Box, BoxProps, Text, Image } from "@chakra-ui/react";

import { ExamHistoryQuestion } from "models/exam";
import { getAudio, getImage } from "utils";
import AnswerHistory from "./AnswerHistory";
import "./history.css"
import { useEffect } from "react";

interface IQuestion extends BoxProps {
  question: ExamHistoryQuestion;
  examId: string;
}

const QuestionHistory = ({ question, examId, ...inputProps }: IQuestion) => {
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
  const select_question = question.answers.find(
    (i) => i.id === question.select_answer
  );
  const isRenderAnswer = () => {
    return (
      !question.select_answer ||
      (right_question && right_question.id !== question.select_answer)
    );
  };

  return (
    <Box my={"10px"} p={"10px"} {...inputProps}>
      {question.attachment && (
        <Box>
          <Image
            w={"300px"}
            h={"200px"}
            src={attachment()}
            alt={"attachment"}
            mx={"auto"}
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
          return (
            <AnswerHistory
              questionId={question.id}
              answer={answer}
              selectAnswer={question.select_answer}
            />
          );
        })}
        {isRenderAnswer() && right_question && (
          <Text color={'#3cb46e'} fontWeight={'500'} mt={'10px'}>
            Đáp án đúng :{" "}
            {renderAnswer(right_question?.order_in_question.toString())}
          </Text>
        )}
      </fieldset>
    </Box>
  );
};

export default QuestionHistory;
