import { Flex } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import ExamPractice from "./components/practice";

const ExamPracticePage = () => {
  const { id } = useParams();
  let [searchParams, setSearchParams] = useSearchParams();
  const parts = searchParams.getAll("part");
  const duration = searchParams.get("duration");
  if (duration && parts && id) {
    return (
      <Flex justifyContent={"center"}>
        <ExamPractice examId={id} part={parts} duration={duration} />
      </Flex>
    );
  }
  return <Flex justifyContent={"center"}>Nope</Flex>;
};

export default ExamPracticePage;
