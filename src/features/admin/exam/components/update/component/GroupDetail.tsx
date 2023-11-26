import { Box, BoxProps, Button } from "@chakra-ui/react";
import Group from "common/components/Exam/Display/Group";
import Question from "common/components/Exam/Display/Question";
import { ExamGroup, ExamQuestion } from "models/exam";
import parse from 'html-react-parser';
import { useState } from "react";
import QuestionDetail from "./QuestionDetail";
import theme from "themes/theme";

interface IGroup extends BoxProps {
  group: ExamGroup;
  onOpenGroupUpdate: (group: ExamGroup) => void;
  onOpenQuestionUpdate: (question:ExamQuestion) => void;
}

const GroupDetail = ({
  group,
  onOpenGroupUpdate,
  onOpenQuestionUpdate,
  ...inputProps
}: IGroup) => {
  const [style, setStyle] = useState({ display: "none" });
  return (
    <Box>
      <Box
        my={"10px"}
        {...inputProps}
        border={`1px solid ${theme.colors.borderColor}`}
        px={'10px'}
        borderRadius={"5px"}
        _hover={{
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
        }}
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
        >
          <Box>
            <b>
              {group.from_question} - {group.to_question}
            </b>
          </Box>
          <Box>{parse(group.question ?? "")}</Box>
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
        <Box p={"10px"}>
          {group.questions.map((question) => {
            return (
              <QuestionDetail
                question={question}
                onOpenQuestionUpdate={onOpenQuestionUpdate}
                id={`question_${question.id}`}
              />
            );
          })}
        </Box>
      </Box>
    </Box>
  );
};

export default GroupDetail;
