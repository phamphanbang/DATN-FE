import {
  Box,
  BoxProps,
  Flex,
  Image,
  Radio,
  RadioGroup,
} from "@chakra-ui/react";

import { ExamQuestion } from "models/exam";
import { getAudio, getImage } from "utils";
import Answer from "./Answer";

interface IQuestion extends BoxProps {
  question: ExamQuestion;
  examId: string;
  onAnswerSelect: (question_id:string,answer_id:string,is_right:boolean) => void;
}

const Question = ({ question, examId,onAnswerSelect, ...inputProps }: IQuestion) => {
  const attachment = () => {
    return getImage("exams/" + examId, question.attachment);
  };

  const audio = () => {
    return getAudio("exams/" + examId, question.audio);
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
      <fieldset>
        {/* <Flex my={"5px"}>
          <Answer
            // name={"question_answers_" + question.id}
            key={'answers_'+question.answers[0].id}
            answer={question.answers[0]}
            w={"50%"}
            p={"5px"}
            // onRadioChange={onRadioChange}
          />
          <Answer
            // name={"question_answers_" + question.id}
            key={'answers_'+question.answers[1].id}
            answer={question.answers[1]}
            w={"50%"}
            p={"5px"}
            // onRadioChange={onRadioChange}
          />
        </Flex>
        <Flex my={"5px"}>
          <Answer
            // name={"question_answers_" + question.id}
            key={'answers_'+question.answers[2].id}
            answer={question.answers[2]}
            w={"50%"}
            p={"5px"}
            // onRadioChange={onRadioChange}
          />
          {question.answers.length == 4 ? (
            <Answer
              // name={"question_answers_" + question.id}
              key={'answers_'+question.answers[3].id}
              answer={question.answers[3]}
              w={"50%"}
              p={"5px"}
              // onRadioChange={onRadioChange}
            />
          ) : (
            ""
          )}
        </Flex> */}
        {/* <legend>{'Question ' + question.id}</legend> */}
        {/* <Flex my={"5px"}>
          <label htmlFor={"answers_" + question.answers[0].id}>
            <input
              type="radio"
              id={"answers_" + question.answers[0].id}
              value={question.answers[0].id}
              name={"question_" + question.id}
              onChange={(e) => console.log(e.target.value)}
            />
            {question.answers[0].answer}
          </label>
          <label htmlFor={"answers_" + question.answers[1].id}>
            <input
              type="radio"
              id={"answers_" + question.answers[1].id}
              value={question.answers[1].id}
              name={"question_" + question.id}
              onChange={(e) => console.log(e.target.value)}
            />
            {question.answers[1].answer}
          </label>
        </Flex>
        <Flex my={"5px"}>
          <label htmlFor={"answers_" + question.answers[2].id}>
            <input
              type="radio"
              id={"answers_" + question.answers[2].id}
              value={question.answers[2].id}
              name={"question_" + question.id}
              onChange={(e) => console.log(e.target.value)}
            />
            {question.answers[2].answer}
          </label>
          {question.answers.length == 4 ? (
            <label htmlFor={"answers_" + question.answers[3].id}>
              <input
                type="radio"
                id={"answers_" + question.answers[3].id}
                value={question.answers[3].id}
                name={"question_" + question.id}
                onChange={(e) => console.log(e.target.value)}
              />
              {question.answers[3].answer}
            </label>
          ) : (
            ""
          )}
        </Flex> */}
        <Flex my={"5px"}>
          <Answer
            questionId={question.id}
            answer={question.answers[0]}
            w={"50%"}
            p={"5px"}
            onAnswerSelect={onAnswerSelect}
          />
          <Answer
            questionId={question.id}
            answer={question.answers[1]}
            w={"50%"}
            p={"5px"}
            onAnswerSelect={onAnswerSelect}
          />
        </Flex>
        <Flex my={"5px"}>
          <Answer
            questionId={question.id}
            answer={question.answers[2]}
            w={"50%"}
            p={"5px"}
            onAnswerSelect={onAnswerSelect}
          />
          {question.answers.length == 4 ? (
            <Answer
              questionId={question.id}
              answer={question.answers[3]}
              w={"50%"}
              p={"5px"}
              onAnswerSelect={onAnswerSelect}
            />
          ) : (
            ""
          )}
        </Flex>
      </fieldset>
    </Box>
  );
};

export default Question;
