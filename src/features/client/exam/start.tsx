import { Flex } from "@chakra-ui/react";
import ExamStart from "./components/start";
import { useParams } from "react-router-dom";
import { setItem } from "utils";
import { LocalStorageKeys } from "common/enums";

const ExamStartPage = () => {
  const { id } = useParams();
  setItem(LocalStorageKeys.prevURL, '/exams/'+id+"/start");
  
  return (
    <Flex justifyContent={"center"}>
      <ExamStart examId={id as string} />
    </Flex>
  );
};

export default ExamStartPage;
