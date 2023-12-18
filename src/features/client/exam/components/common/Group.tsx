import { Box, BoxProps, Image } from "@chakra-ui/react";
import { ExamGroup } from "models/exam";
import Question from "./Question";
import { getImage, getAudio } from "utils";
import { partTypeValue } from "common/constants";
import "./groupQuestion.css";
import parse from "html-react-parser";

interface IGroup extends BoxProps {
  group: ExamGroup;
  partType: string;
  examId: string;
  onAnswerSelect: (
    question_id: string,
    answer_id: string,
    is_right: boolean
  ) => void;
  showAudio: boolean;
}

const Group = ({
  group,
  partType,
  examId,
  onAnswerSelect,
  showAudio,
  ...inputProps
}: IGroup) => {
  const attachment = () => {
    return getImage("exams/" + examId, group.attachment);
  };

  const audio = () => {
    return getAudio("exams/" + examId, group.audio);
  };
  return (
    <Box
      my={"20px"}
      {...inputProps}
      style={
        partType === partTypeValue.READING
          ? {
              borderBottom: "1px solid #c7c7c7"
            }
          : {}
      }
    >
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
                  width: "60%",
                  overflowY: "auto",
                }
              : {}
          }
        >
          {showAudio && group.audio && (
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
          {group.question && <Box className="groupQuestion">{parse(group.question)}</Box>}

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
          style={
            partType === partTypeValue.READING
              ? {
                  width: "40%",
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
                showAudio={showAudio}
              />
            );
          })}
        </Box>
      </Box>
    </Box>
  );
};

export default Group;
