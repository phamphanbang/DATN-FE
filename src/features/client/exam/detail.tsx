import { Flex } from "@chakra-ui/react";
import ExamDetail from "./components/detail";
import { useParams } from "react-router-dom";
import { setItem } from "utils";
import { LocalStorageKeys } from "common/enums";

const ExamDetailPage = () => {
  const { id } = useParams();
  setItem(LocalStorageKeys.prevURL, '/exams/'+id);
  return (
    <Flex justifyContent={"center"}>
      <ExamDetail examId={id as string} />
      {/* <SideBar /> */}
    </Flex>
  );
};

export default ExamDetailPage;
