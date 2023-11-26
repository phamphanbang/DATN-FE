import { Box, BoxProps } from "@chakra-ui/react";
import { ExamGroup } from "models/exam";
import Question from "./Question";

interface IGroup extends BoxProps {
  group: ExamGroup;
}

const Group = ({ group, ...inputProps }: IGroup) => {
  return (
    <Box my={"10px"} {...inputProps}>
      <Box>
        <b>{group.from_question} - {group.to_question}</b>
      </Box>
      <Box>
        {group.question}
      </Box>
      <Box p={'10px'}>
        {group.questions.map((question) => {
            return (
                <Question question={question}/>
            )
        })}
      </Box>
    </Box>
  );
};

export default Group;
