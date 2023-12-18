import { Flex } from "@chakra-ui/react";
import SideBar from "../../../common/usercomponents/SideBar";
import { useParams } from "react-router-dom";
import HistoryDetail from "./components/history";

const HistoryDetailPage = () => {
  const { exam_id,history_id } = useParams();
  return (
    <Flex justifyContent={"center"}>
      <HistoryDetail examId={exam_id as string} historyId={history_id as string}/>
      {/* <SideBar /> */}
    </Flex>
  );
};

export default HistoryDetailPage;
