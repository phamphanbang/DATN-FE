import { Box, BoxProps, Image } from "@chakra-ui/react";
import { ExamGroup } from "models/exam";
import Question from "./Question";
import { getImage, getAudio } from "utils";

interface IGroup extends BoxProps {
  group: ExamGroup;
  examId: string;
}

const Group = ({ group,examId, ...inputProps }: IGroup) => {
  const attachment = () => {
    return getImage("exams/" + examId, group.attachment);
  };

  const audio = () => {
    return getAudio("exams/" + examId, group.audio);
  };
  return (
    <Box my={"10px"} {...inputProps}>
      <Box>
        <b>{group.from_question} - {group.to_question}</b>
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
      <Box>
        {group.question}
      </Box>
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
      
      <Box p={'10px'}>
        {group.questions.map((question) => {
            return (
                <Question question={question} examId={examId}/>
            )
        })}
      </Box>
    </Box>
  );
};

export default Group;
