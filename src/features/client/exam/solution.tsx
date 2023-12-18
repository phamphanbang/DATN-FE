import { Flex } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import ExamSolution from "./components/solution";

const ExamSolutionPage = () => {
  const { exam_id,part } = useParams();
  if ( exam_id) {
    return (
      <Flex justifyContent={"center"}>
        <ExamSolution examId={exam_id} part={part}/>
      </Flex>
    );
  }
  return <Flex justifyContent={"center"}>Nope</Flex>;
};

export default ExamSolutionPage;
