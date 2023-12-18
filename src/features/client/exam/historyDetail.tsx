import { Flex } from "@chakra-ui/react";
import SideBar from "../../../common/usercomponents/SideBar";
import { useParams } from "react-router-dom";
import ExamHistoryDetail from "./components/historyDetail";

const ExamHistoryDetailPage = () => {
  const { exam_id,history_id } = useParams();
  return (
    <Flex justifyContent={"center"}>
      <ExamHistoryDetail examId={exam_id as string} historyId={history_id as string}/>
    </Flex>
  );
};

export default ExamHistoryDetailPage;
