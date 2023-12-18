import {
  Box,
  BoxProps,
  Button,
  Flex,
  Image,
  Text
} from "@chakra-ui/react";

import { ExamQuestion } from "models/exam";
import { getAudio, getImage } from "utils";
import Answer from "./Answer";

interface IQuestion extends BoxProps {
  question: ExamQuestion;
  examId: string;
  onAnswerSelect: (
    question_id: string,
    answer_id: string,
    is_right: boolean
  ) => void;
  showAudio: boolean;
}

const Question = ({
  question,
  examId,
  onAnswerSelect,
  showAudio,
  ...inputProps
}: IQuestion) => {
  const attachment = () => {
    return getImage("exams/" + examId, question.attachment);
  };

  const audio = () => {
    return getAudio("exams/" + examId, question.audio);
  };

  const onMarked = () => {
    const el = document.querySelector("#navButton_" + question.id);
    const qe = document.querySelector("#navQuestion_" + question.id);
    if (el && qe) {
      el.classList.toggle("question_marked");
      qe.classList.toggle("question_marked");
    }
  };

  return (
    <Box my={"10px"} p={"10px"} {...inputProps}>
      {question.attachment && (
        <Box ml={'20px'}>
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
      {showAudio  && question.audio && (
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
      <Flex alignItems={'flex-start'} mb={'10px'} gap={'10px'}>
        <Button
          id={"navQuestion_" + question.id}
          onClick={onMarked}
          borderRadius={"50%"}
          width={"35px"}
          height={"35px"}
        >
          {question.order_in_test}
        </Button>
        <Text>{question.question}</Text>
      </Flex>
      <Box ml={"20px"}>
        <fieldset>
          {question.answers.map((answer) => {
            return (
              <Answer
                questionId={question.id}
                answer={answer}
                // w={"50%"}
                p={"5px"}
                my={"10px"}
                onAnswerSelect={onAnswerSelect}
              />
            );
          })}
        </fieldset>
      </Box>
    </Box>
  );
};

export default Question;
