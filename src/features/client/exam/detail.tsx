import { Flex } from "@chakra-ui/react";
import SideBar from "./components/SideBar";
import ExamDetail from "./components/detail";
import { useParams } from "react-router-dom";

const ExamDetailPage = () => {
  const { id } = useParams();
  return (
    <Flex justifyContent={"center"}>
      <ExamDetail examId={id as string} />
      <SideBar />
    </Flex>
  );
};

export default ExamDetailPage;
