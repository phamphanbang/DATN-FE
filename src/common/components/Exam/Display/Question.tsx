import { Box, BoxProps, Image } from "@chakra-ui/react";
import { ExamQuestion } from "models/exam";
import Answer from "./Answer";
import { getAudio, getImage } from "utils";

interface IQuestion extends BoxProps {
  question: ExamQuestion;
  examId: string;
}

const Question = ({ question, examId, ...inputProps }: IQuestion) => {
  const attachment = () => {
    return getImage("exams/" + examId, question.attachment);
  };

  const audio = () => {
    return getAudio("exams/" + examId, question.audio);
  };

  return (
    <Box my={"10px"} {...inputProps}>
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
