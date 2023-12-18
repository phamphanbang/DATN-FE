import { Box, BoxProps, Button, Image } from "@chakra-ui/react";
import { ExamGroup, ExamQuestion } from "models/exam";
import parse from "html-react-parser";
import { useState } from "react";
import QuestionDetail from "./QuestionDetail";
import theme from "themes/theme";
import { getImage, getAudio } from "utils";
import { partTypeValue } from "common/constants";
import "./groupQuestion.css";

interface IGroup extends BoxProps {
  group: ExamGroup;
  examId: string;
  partType: string;
  onOpenGroupUpdate: (group: ExamGroup) => void;
  onOpenQuestionUpdate: (question: ExamQuestion) => void;
}

const GroupDetail = ({
  group,
  examId,
  partType,
  onOpenGroupUpdate,
  onOpenQuestionUpdate,
  ...inputProps
}: IGroup) => {
  const [style, setStyle] = useState({ display: "none" });
  const attachment = () => {
    return getImage("exams/" + examId, group.attachment);
  };

  const audio = () => {
    return getAudio("exams/" + examId, group.audio);
  };
  return (
    <Box>
      <Box
        my={"10px"}
        {...inputProps}
        border={`1px solid ${theme.colors.borderColor}`}
        px={"10px"}
        borderRadius={"5px"}
        _hover={{
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
        }}
        style={partType === partTypeValue.READING ? {
          display: 'flex',
          maxHeight: '600px'
        } : {}}
      >
        <Box
          position={"relative"}
          p={"10px 0px"}
          onMouseEnter={() => {
            setStyle({ display: "block" });
          }}
          onMouseLeave={() => {
            setStyle({ display: "none" });
          }}
          style={partType === partTypeValue.READING ? {
            width: '50%',
            overflowY: 'auto'
          } : {}}
        >
          <Box>
            <b>
              {group.from_question} - {group.to_question}
            </b>
          </Box>
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
          <Box className="groupQuestion">{parse(group.question ?? "")}</Box>
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

          <Button
            w="fit-content"
            colorScheme="gray"
            position={"absolute"}
            top={"2"}
            right={"2"}
            style={style}
            onClick={() => onOpenGroupUpdate(group)}
          >
            Update Group {group.from_question} - {group.to_question}
          </Button>
        </Box>
        <Box p={"10px"}
        style={partType === partTypeValue.READING ? {
          width: '45%',
          marginLeft:'15px',
          overflowY: 'auto'
        } : {}}>
          {group.questions.map((question) => {
            return (
              <QuestionDetail
                question={question}
                onOpenQuestionUpdate={onOpenQuestionUpdate}
                id={`question_${question.id}`}
                examId={examId}
              />
            );
          })}
        </Box>
      </Box>
    </Box>
  );
};

export default GroupDetail;
