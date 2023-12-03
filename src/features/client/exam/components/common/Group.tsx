import { Box, BoxProps, Image } from "@chakra-ui/react";
import { ExamGroup } from "models/exam";
import Question from "./Question";
import { getImage, getAudio } from "utils";
import { partTypeValue } from "common/constants";

interface IGroup extends BoxProps {
  group: ExamGroup;
  partType: string;
  examId: string;
  onAnswerSelect: (question_id:string,answer_id:string,is_right:boolean) => void;
}

const Group = ({ group, partType, examId,onAnswerSelect, ...inputProps }: IGroup) => {
  const attachment = () => {
    return getImage("exams/" + examId, group.attachment);
  };

  const audio = () => {
    return getAudio("exams/" + examId, group.audio);
  };
  return (
    <Box my={"10px"} {...inputProps}>
      <Box>
        <b>
          {group.from_question} - {group.to_question}
        </b>
      </Box>
      <Box
        style={
          partType === partTypeValue.READING
            ? {
                display: "flex",
                maxHeight: "600px",
              }
            : {}
        }
      >
        <Box
          style={
            partType === partTypeValue.READING
              ? {
                  width: "50%",
                  overflowY: "auto",
                }
              : {}
          }
        >
          {group.audio && (
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
          <Box>{group.question}</Box>
          {group.attachment && (
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
        </Box>

        <Box
          p={"10px"}
          w={"50%"}
          style={
            partType === partTypeValue.READING
              ? {
                  width: "50%",
                  overflowY: "auto",
                }
              : {}
          }
        >
          {group.questions.map((question) => {
            return (
              <Question
                id={"questions_" + question.id}
                key={"key_question_" + question.id}
                question={question}
                examId={examId}
                onAnswerSelect={onAnswerSelect}
              />
            );
          })}
        </Box>
      </Box>
    </Box>
  );
};

export default Group;
