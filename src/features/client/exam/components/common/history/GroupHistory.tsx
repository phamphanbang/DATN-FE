import { Box, BoxProps, Image } from "@chakra-ui/react";
import { ExamHistoryGroup } from "models/exam";
import QuestionHistory from "./QuestionHistory";
import { getImage, getAudio } from "utils";
import { partTypeValue } from "common/constants";
import parse from 'html-react-parser'

interface IGroup extends BoxProps {
  group: ExamHistoryGroup;
  partType: string;
  examId: string;
}

const GroupHistory = ({ group, partType, examId, ...inputProps }: IGroup) => {
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
          {group.question && (<Box>{parse(group.question)}</Box>)}
          
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
              <QuestionHistory
                id={"questions_" + question.id}
                key={"key_question_" + question.id}
                question={question}
                examId={examId}
              />
            );
          })}
        </Box>
      </Box>
    </Box>
  );
};

export default GroupHistory;
