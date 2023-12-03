import { Flex } from "@chakra-ui/react";
import SideBar from "./components/SideBar";
import ExamStart from "./components/start";
import { useParams } from "react-router-dom";

const ExamStartPage = () => {
  const { id } = useParams();
  return (
    <Flex justifyContent={"center"}>
      <ExamStart examId={id as string} />
    </Flex>
  );
};

export default ExamStartPage;
