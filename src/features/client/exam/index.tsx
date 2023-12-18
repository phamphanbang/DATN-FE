import { Flex } from "@chakra-ui/react";
import ExamIndexTable from "./components/index";
import { setItem } from "utils";
import { LocalStorageKeys } from "common/enums";

const ExamIndexPage = () => {
  setItem(LocalStorageKeys.prevURL, '/exams');
  return (
    <Flex justifyContent={"center"}>
      <ExamIndexTable />
      {/* <SideBar /> */}
    </Flex>
  );
};

export default ExamIndexPage;
